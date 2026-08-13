using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;
using System.Windows.Forms;

namespace InventorySystem.Helpers
{
    public class ReceiptPrintItem
    {
        public string Name { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
    }

    public class ReceiptPrintOptions
    {
        public string PrinterName { get; set; }
        /// <summary>auto | escpos | gdi — blank/auto uses saved profile then heuristics.</summary>
        public string Protocol { get; set; }
        public int Copies { get; set; } = 1;
        public bool Landscape { get; set; }
        public bool Color { get; set; } = true;
        public string CustomerName { get; set; }
        public string ShippingTo { get; set; }
        public string CurrencySymbol { get; set; } = "$";
        public List<ReceiptPrintItem> Items { get; set; } = new List<ReceiptPrintItem>();
        public decimal Subtotal { get; set; }
        public decimal Vat { get; set; }
        public decimal Shipping { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
    }

    public static class ReceiptPrintHelper
    {
        // ~80mm roll at 100 DPI units (hundredths of an inch)
        private const int ReceiptWidthHi = 315;   // 3.15"
        private const int ReceiptMinHeightHi = 600;
        private const int RenderDpi = 203;        // common thermal DPI

        private static ReceiptPrintOptions _opts;
        private static Bitmap _pageBitmap;
        private static bool _thermalMode;

        public static void Print(ReceiptPrintOptions options)
        {
            if (options == null) return;
            _opts = options;

            var mode = PrinterProfileStore.ResolveReceiptProtocol(options.PrinterName, options.Protocol);
            if (!string.IsNullOrWhiteSpace(options.Protocol))
                PrinterProfileStore.Remember(options.PrinterName, receiptProtocol: options.Protocol);

            _thermalMode = mode == PrintProtocol.EscPos
                           || mode == PrintProtocol.Tspl
                           || ThermalPrintUtil.LooksLikeThermalPrinter(options.PrinterName);

            DisposePage();
            bool escPos = mode == PrintProtocol.EscPos;
            _pageBitmap = RenderReceiptBitmap(options, largeThermal: escPos || _thermalMode);

            // ESC/POS thermal receipt path
            if (escPos)
            {
                try
                {
                    EscPosRawPrint.PrintBitmap(
                        options.PrinterName,
                        _pageBitmap,
                        copies: Math.Max(1, options.Copies),
                        docName: "Panache Receipt");
                }
                finally
                {
                    DisposePage();
                }
                return;
            }

            // Raw TSPL (TSC etc.) when profile/auto selects it
            if (mode == PrintProtocol.Tspl)
            {
                try
                {
                    double wMm = Math.Min(72, TsplRawPrint.DotsToMm(_pageBitmap.Width));
                    double hMm = Math.Max(20, TsplRawPrint.DotsToMm(_pageBitmap.Height) + 2);
                    TsplRawPrint.PrintBitmap(
                        options.PrinterName,
                        _pageBitmap,
                        wMm,
                        hMm,
                        gapMm: 0,
                        copies: options.Copies,
                        docName: "Panache Receipt");
                }
                finally
                {
                    DisposePage();
                }
                return;
            }

            using (PrintDocument pd = new PrintDocument())
            {
                ThermalPrintUtil.ApplyPrinter(pd, options.PrinterName, options.Copies, false, options.Color);

                int heightHi = Math.Max(ReceiptMinHeightHi,
                    (int)Math.Ceiling(_pageBitmap.Height * 100.0 / RenderDpi) + 20);
                try
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("Receipt80mm", ReceiptWidthHi, heightHi);
                }
                catch
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("Receipt", ReceiptWidthHi, heightHi);
                }
                pd.DefaultPageSettings.Margins = new Margins(8, 8, 8, 8);

                // Prefer printer's custom continuous paper if available
                TrySelectNarrowPaper(pd);

                pd.PrintPage += PrintPage;
                try
                {
                    pd.Print();
                }
                finally
                {
                    pd.PrintPage -= PrintPage;
                    DisposePage();
                }
            }
        }

        private static void TrySelectNarrowPaper(PrintDocument pd)
        {
            try
            {
                PaperSize best = null;
                int bestW = int.MaxValue;
                foreach (PaperSize ps in pd.PrinterSettings.PaperSizes)
                {
                    // Prefer ~58–80mm widths (230–320 hundredths)
                    if (ps.Width >= 200 && ps.Width <= 340 && ps.Width < bestW)
                    {
                        best = ps;
                        bestW = ps.Width;
                    }
                }
                if (best != null)
                    pd.DefaultPageSettings.PaperSize = best;
            }
            catch { }
        }

        private static void PrintPage(object sender, PrintPageEventArgs e)
        {
            e.HasMorePages = false;
            if (_pageBitmap == null) return;

            Rectangle bounds = e.MarginBounds;
            if (bounds.Width < 20 || bounds.Height < 20)
                bounds = e.PageBounds;

            // Fit width; keep aspect (thermal rolls are continuous)
            float scale = Math.Min(
                (float)bounds.Width / _pageBitmap.Width,
                (float)_pageBitmap.Height > 0 ? (float)bounds.Height / _pageBitmap.Height : 1f);
            if (scale <= 0) scale = 1f;
            // Prefer filling width on thermal
            if (_thermalMode)
                scale = (float)bounds.Width / Math.Max(1, _pageBitmap.Width);

            int w = Math.Max(1, (int)(_pageBitmap.Width * scale));
            int h = Math.Max(1, (int)(_pageBitmap.Height * scale));
            var dest = new Rectangle(bounds.Left, bounds.Top, w, Math.Min(h, bounds.Height));
            ThermalPrintUtil.DrawPageBitmap(e.Graphics, _pageBitmap, dest);
        }

        private static Bitmap RenderReceiptBitmap(ReceiptPrintOptions o, bool largeThermal = false)
        {
            // Match XP-365B printable width exactly (no later soft upscale blur)
            int widthPx = largeThermal
                ? EscPosRawPrint.MaxWidthDots
                : (int)(ReceiptWidthHi / 100.0 * RenderDpi);

            float headerPt = largeThermal ? 22f : 12f;
            float bodyPt = largeThermal ? 14f : 9f;
            float totalPt = largeThermal ? 16f : 10f;
            int topMargin = largeThermal ? 40 : 16;
            int bottomMargin = largeThermal ? 120 : 20;
            int pad = largeThermal ? 16 : 12;
            int lineH = largeThermal ? 28 : 18;
            int headerH = largeThermal ? 36 : 22;
            int qtyCol = largeThermal ? 56 : 40;
            int nameMax = largeThermal ? 28 : 24;

            int contentW = widthPx - pad * 2;
            int measuredY = topMargin + headerH + lineH + lineH + 28;
            if (!string.IsNullOrWhiteSpace(o.CustomerName)) measuredY += lineH;
            if (!string.IsNullOrWhiteSpace(o.ShippingTo)) measuredY += lineH * 2;
            measuredY += lineH + 8;
            measuredY += (o.Items?.Count ?? 0) * lineH + 12;
            measuredY += lineH * 5 + 48 + bottomMargin;

            int heightPx = Math.Max(measuredY + pad, 200);
            var bmp = new Bitmap(widthPx, heightPx, System.Drawing.Imaging.PixelFormat.Format24bppRgb);
            int y = topMargin;
            using (var g = Graphics.FromImage(bmp))
            {
                g.Clear(Color.White);
                g.SmoothingMode = SmoothingMode.None;
                // Antialias then threshold in ESC/POS packer → thicker, clearer glyphs
                g.TextRenderingHint = largeThermal
                    ? System.Drawing.Text.TextRenderingHint.AntiAliasGridFit
                    : System.Drawing.Text.TextRenderingHint.SingleBitPerPixelGridFit;

                using var fH = new Font("Consolas", headerPt, FontStyle.Bold);
                using var fS = new Font("Consolas", bodyPt, FontStyle.Bold);
                using var fI = new Font("Consolas", bodyPt, FontStyle.Bold);
                using var fB = new Font("Consolas", totalPt, FontStyle.Bold);
                var center = new StringFormat { Alignment = StringAlignment.Center };
                var right = new StringFormat { Alignment = StringAlignment.Far };
                string sym = string.IsNullOrWhiteSpace(o.CurrencySymbol) ? "$" : o.CurrencySymbol;

                int m = pad;
                int w = contentW;
                using var thickPen = new Pen(Color.Black, largeThermal ? 2f : 1f);

                string company = ThemeConfig.CompanyName;
                if (string.IsNullOrWhiteSpace(company)) company = "Panache";
                g.DrawString(company.ToUpperInvariant(), fH, Brushes.Black, new RectangleF(m, y, w, headerH), center);
                y += headerH + 4;
                g.DrawString("SALES RECEIPT", fS, Brushes.Black, new RectangleF(m, y, w, lineH), center);
                y += lineH;
                // Unambiguous local time (avoids culture "g" quirks on thermal)
                string when = DateTime.Now.ToString("dd/MM/yyyy HH:mm", System.Globalization.CultureInfo.InvariantCulture);
                g.DrawString(when, fS, Brushes.Black, new RectangleF(m, y, w, lineH), center);
                y += lineH + 6;
                g.DrawLine(thickPen, m, y, m + w, y);
                y += 10;

                if (!string.IsNullOrWhiteSpace(o.CustomerName))
                {
                    g.DrawString("Customer: " + o.CustomerName, fS, Brushes.Black, m, y);
                    y += lineH;
                }
                if (!string.IsNullOrWhiteSpace(o.ShippingTo))
                {
                    g.DrawString("Ship to: " + o.ShippingTo.Replace("\r\n", ", ").Replace("\n", ", "), fS, Brushes.Black,
                        new RectangleF(m, y, w, lineH * 2));
                    y += lineH * 2;
                }

                g.DrawString("QTY", fI, Brushes.Black, m, y);
                g.DrawString("ITEM", fI, Brushes.Black, m + qtyCol, y);
                g.DrawString("TOTAL", fI, Brushes.Black, new RectangleF(m, y, w, lineH - 4), right);
                y += lineH - 4;
                g.DrawLine(thickPen, m, y, m + w, y);
                y += 8;

                if (o.Items != null)
                {
                    foreach (var it in o.Items)
                    {
                        string name = it.Name ?? "";
                        if (name.Length > nameMax) name = name.Substring(0, Math.Max(0, nameMax - 3)) + "...";
                        g.DrawString(Math.Max(1, it.Qty).ToString(), fI, Brushes.Black, m, y);
                        g.DrawString(name, fI, Brushes.Black, m + qtyCol, y);
                        g.DrawString(FormatMoney(sym, it.Total), fI, Brushes.Black, new RectangleF(m, y, w, lineH - 4), right);
                        y += lineH;
                    }
                }

                y += 4;
                g.DrawLine(thickPen, m, y, m + w, y);
                y += 10;

                void Row(string label, decimal amount, bool bold = false)
                {
                    var font = bold ? fB : fS;
                    g.DrawString(label, font, Brushes.Black, m, y);
                    g.DrawString(FormatMoney(sym, amount), font, Brushes.Black, new RectangleF(m, y, w, lineH), right);
                    y += lineH;
                }

                Row("Subtotal", o.Subtotal);
                if (o.Vat > 0.009m) Row("VAT", o.Vat);
                if (o.Shipping > 0.009m) Row("Shipping", o.Shipping);
                if (o.Discount > 0.009m) Row("Discount", -o.Discount);
                y += 4;
                g.DrawLine(thickPen, m, y, m + w, y);
                y += 10;
                Row("TOTAL", o.Total, true);
                y += 12;
                g.DrawString("Thank you!", fS, Brushes.Black, new RectangleF(m, y, w, lineH), center);
                y += lineH + bottomMargin;
            }

            // Crop unused white space at bottom (keep bottomMargin after Thank you)
            int cropH = Math.Min(bmp.Height, Math.Max(120, y + 4));
            if (cropH < bmp.Height)
            {
                var cropped = bmp.Clone(new Rectangle(0, 0, bmp.Width, cropH), bmp.PixelFormat);
                bmp.Dispose();
                bmp = cropped;
            }

            // ESC/POS packs from 24bpp with a thick threshold — keep AA edges
            if (largeThermal)
                return bmp;

            var mono = ThermalPrintUtil.ToMonoBitmap(bmp);
            bmp.Dispose();
            return mono;
        }

        private static void DisposePage()
        {
            try { _pageBitmap?.Dispose(); } catch { }
            _pageBitmap = null;
        }

        private static string FormatMoney(string symbol, decimal amount)
        {
            return $"{symbol}{amount:0.00}";
        }
    }
}
