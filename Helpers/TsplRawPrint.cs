using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace InventorySystem.Helpers
{
    /// <summary>
    /// Label-mode printing for XP-365B. Uses minimal TSPL that draws filled bars
    /// (proves heat) plus BARCODE/TEXT. Optional CPCL fallback.
    /// </summary>
    internal static class TsplRawPrint
    {
        private const int Dpi = 203;
        public const double DefaultGapMm = 3;
        // Slightly taller than 30mm — photo showed blank bottom + drift (SIZE was too short)
        public const double DefaultWidthMm = 50;
        public const double DefaultHeightMm = 40;

        public static bool PrefersRawTspl(string printerName)
        {
            string n = ResolvePrinterName(printerName);
            if (string.IsNullOrWhiteSpace(n)) return false;
            n = n.ToLowerInvariant();
            string[] keys = { "tsc", "godex", "gainscha", "label printer", "barcode printer" };
            foreach (var k in keys)
                if (n.Contains(k)) return true;
            return false;
        }

        public static bool PrefersLabelTspl(string printerName)
        {
            if (PrefersRawTspl(printerName)) return true;
            string n = ResolvePrinterName(printerName);
            if (string.IsNullOrWhiteSpace(n)) return false;
            n = n.ToLowerInvariant();
            string[] keys = { "xprinter", "xp-", "xp ", "365b", "365bm" };
            foreach (var k in keys)
                if (n.Contains(k)) return true;
            return false;
        }

        public static string ResolvePrinterName(string printerName)
        {
            if (!string.IsNullOrWhiteSpace(printerName))
                return printerName.Trim();
            try { return new System.Drawing.Printing.PrinterSettings().PrinterName; }
            catch { return null; }
        }

        public static double DotsToMm(int dots) => dots * 25.4 / Dpi;
        public static int MmToDots(double mm) => Math.Max(1, (int)Math.Round(mm / 25.4 * Dpi));

        /// <summary>
        /// Print labels in Label mode. Tries minimal TSPL (BAR/BOX/BARCODE), then CPCL.
        /// </summary>
        public static void PrintNativeLabels(
            string printerName,
            IReadOnlyList<(string Name, string Sku, string Price)> labels,
            double widthMm,
            double heightMm,
            int copies,
            string docName,
            double gapMm = -1)
        {
            if (labels == null || labels.Count == 0) return;
            copies = Math.Max(1, Math.Min(99, copies));
            if (gapMm < 0) gapMm = DefaultGapMm;
            string target = ResolvePrinterName(printerName)
                ?? throw new InvalidOperationException("No printer selected for label print.");

            Exception last = null;

            // A) Minimal TSPL — no SET_* (those abort some Xprinter firmwares)
            try
            {
                byte[] job = BuildMinimalTsplJob(labels, widthMm, heightMm, gapMm, copies);
                SaveDebug(job, "tspl_minimal.bin", "tspl_minimal.txt");
                RawPrinterHelper.SendBytes(target, job, docName);
                return;
            }
            catch (Exception ex) { last = ex; }

            // B) CPCL (some dual-mode units speak CPCL in label mode)
            try
            {
                byte[] job = BuildCpclJob(labels, copies);
                SaveDebug(job, "cpcl_labels.bin", "cpcl_labels.txt");
                RawPrinterHelper.SendBytes(target, job, docName + " CPCL");
                return;
            }
            catch (Exception ex) { last = ex; }

            throw last ?? new InvalidOperationException("Label print failed.");
        }

        public static void PrintBitmaps(
            string printerName,
            IReadOnlyList<System.Drawing.Bitmap> pages,
            double widthMm,
            double heightMm,
            double gapMm,
            int copies,
            string docName)
        {
            // For non-Xprinter TSPL devices: send native text derived is preferred.
            // Keep API for ReceiptPrintHelper TSC fallback — convert to a simple BAR proof + skip.
            if (pages == null || pages.Count == 0) return;
            var labels = new List<(string, string, string)>();
            for (int i = 0; i < pages.Count; i++)
                labels.Add(("LABEL", "L" + (i + 1), ""));
            PrintNativeLabels(printerName, labels, widthMm, heightMm, copies, docName);
        }

        public static void PrintBitmap(
            string printerName, System.Drawing.Bitmap page, double widthMm, double heightMm, double gapMm, int copies, string docName)
            => PrintBitmaps(printerName, new[] { page }, widthMm, heightMm, gapMm, copies, docName);

        /// <summary>
        /// Centered TSPL layout with clear vertical gaps between name / barcode / sku / price.
        /// </summary>
        private static byte[] BuildMinimalTsplJob(
            IReadOnlyList<(string Name, string Sku, string Price)> labels,
            double widthMm, double heightMm, double gapMm, int copies)
        {
            var ms = new MemoryStream();
            void Cmd(string s)
            {
                var b = Encoding.ASCII.GetBytes(s);
                ms.Write(b, 0, b.Length);
            }

            widthMm = Clamp(widthMm, 20, 80);
            heightMm = Clamp(heightMm, 20, 120);
            gapMm = Clamp(gapMm, 1, 10);

            int hDots = MmToDots(heightMm);
            int wDots = MmToDots(widthMm);
            int margin = 16;

            // Font "3" cell width @ 203dpi (tuned for XP-365B — was 11, too wide → left bias)
            const int font3Cell = 8;
            // Extra X nudge if stock origin sits slightly left of geometric center
            const int xNudge = 8;

            foreach (var label in labels)
            {
                string name = Sanitize(label.Name, 20);
                if (string.IsNullOrWhiteSpace(name)) name = "ITEM";
                string sku = Sanitize(string.IsNullOrWhiteSpace(label.Sku) ? "0000" : label.Sku, 22);
                if (sku.Length < 2) sku = "ID" + sku;
                string price = Sanitize(label.Price ?? "", 12);

                Cmd($"SIZE {Fmt(widthMm)} mm,{Fmt(heightMm)} mm\r\n");
                Cmd($"GAP {Fmt(gapMm)} mm,0 mm\r\n");
                Cmd("DIRECTION 0\r\n");
                Cmd("REFERENCE 0,8\r\n");
                Cmd("DENSITY 12\r\n");
                Cmd("SPEED 3\r\n");
                Cmd("CLS\r\n");

                int CenterX(int contentW)
                {
                    int x = (wDots - contentW) / 2 + xNudge;
                    return Math.Clamp(x, margin, Math.Max(margin, wDots - contentW - margin));
                }

                // Extra top padding so name is not against the die-cut edge
                int y = margin + 28;

                // Name — scale 1x2, centered
                int nameW = name.Length * font3Cell;
                int nameX = CenterX(nameW);
                Cmd($"TEXT {nameX},{y},\"3\",0,1,2,\"{name}\"\r\n");
                // Clear gap under tall 1x2 name before barcode
                y += 60;

                // Barcode — width estimate tuned from XP-365B photos (still left at *17+30).
                const int narrow = 2;
                int barcodeW = Math.Min(wDots - margin * 2, sku.Length * 13 + 24);
                int barcodeH = 55;
                // Extra right bias: printed bars render narrower than estimate
                int barX = Math.Clamp(CenterX(barcodeW) + 16, margin, wDots - margin - 60);
                // readable=0 — we print the number ourselves with proper spacing
                Cmd($"BARCODE {barX},{y},\"128\",{barcodeH},0,0,{narrow},{narrow},\"{sku}\"\r\n");
                y += barcodeH + 16;

                // SKU number — centered
                int skuW = sku.Length * font3Cell;
                int skuX = CenterX(skuW);
                Cmd($"TEXT {skuX},{y},\"3\",0,1,1,\"{sku}\"\r\n");
                // Clear gap between SKU digits and price
                y += 44;

                // Price — short strings looked left of the barcode; center on barcode
                // midpoint with the same cell width used for name/SKU (not font-3 native 16).
                if (!string.IsNullOrWhiteSpace(price) && y + 36 < hDots - margin)
                {
                    int priceW = price.Length * font3Cell;
                    int barMid = barX + barcodeW / 2;
                    int priceX = Math.Clamp(barMid - priceW / 2 + 12, margin, wDots - margin - 24);
                    Cmd($"TEXT {priceX},{y},\"3\",0,1,2,\"{price}\"\r\n");
                }

                Cmd($"PRINT {copies}\r\n");
            }

            return ms.ToArray();
        }

        private static byte[] BuildCpclJob(
            IReadOnlyList<(string Name, string Sku, string Price)> labels, int copies)
        {
            var ms = new MemoryStream();
            void Cmd(string s)
            {
                var b = Encoding.ASCII.GetBytes(s);
                ms.Write(b, 0, b.Length);
            }

            foreach (var label in labels)
            {
                string name = Sanitize(label.Name, 22);
                if (string.IsNullOrWhiteSpace(name)) name = "ITEM";
                string sku = Sanitize(string.IsNullOrWhiteSpace(label.Sku) ? "0000" : label.Sku, 24);
                string price = Sanitize(label.Price ?? "", 14);

                for (int c = 0; c < copies; c++)
                {
                    // Centered-ish CPCL fallback (PAGE-WIDTH 400)
                    Cmd("! 0 203 203 320 1\r\n");
                    Cmd("PAGE-WIDTH 400\r\n");
                    int namePad = Math.Max(0, (40 - name.Length) / 2);
                    int skuPad = Math.Max(0, (40 - sku.Length) / 2);
                    int pricePad = Math.Max(0, (40 - price.Length) / 2);
                    Cmd($"TEXT 7 0 20 24 {new string(' ', namePad)}{name}\r\n");
                    Cmd($"BARCODE 128 2 1 55 60 80 {sku}\r\n");
                    Cmd($"TEXT 7 0 20 155 {new string(' ', skuPad)}{sku}\r\n");
                    if (!string.IsNullOrWhiteSpace(price))
                        Cmd($"TEXT 7 0 20 190 {new string(' ', pricePad)}{price}\r\n");
                    Cmd("PRINT\r\n");
                }
            }

            return ms.ToArray();
        }

        private static double Clamp(double v, double lo, double hi)
            => Math.Max(lo, Math.Min(hi, v));

        private static string Sanitize(string s, int maxLen)
        {
            if (string.IsNullOrEmpty(s)) return "";
            var sb = new StringBuilder(s.Length);
            foreach (char ch in s)
            {
                if (ch == '"' || ch < 32) sb.Append(' ');
                else if (ch <= 126) sb.Append(ch);
                else sb.Append('?');
            }
            string clean = Regex.Replace(sb.ToString().Trim(), @"\s+", " ");
            return clean.Length > maxLen ? clean.Substring(0, maxLen) : clean;
        }

        private static string Fmt(double mm) => mm.ToString("0.##", CultureInfo.InvariantCulture);

        private static void SaveDebug(byte[] job, string binName, string txtName)
        {
            try
            {
                string dir = Path.Combine(AppContext.BaseDirectory, "Logs");
                Directory.CreateDirectory(dir);
                File.WriteAllBytes(Path.Combine(dir, binName), job);
                // Only ASCII portion for text dump
                File.WriteAllText(Path.Combine(dir, txtName), Encoding.ASCII.GetString(job), Encoding.ASCII);
            }
            catch { }
        }
    }
}
