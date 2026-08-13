using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;

namespace InventorySystem.Helpers
{
    /// <summary>
    /// ESC/POS raw raster printing for Xprinter XP-365B (receipt mode) and similar.
    /// TSPL is ignored when the device is in ESC/POS mode and prints commands as text.
    /// </summary>
    internal static class EscPosRawPrint
    {
        public const int Dpi = 203;
        // XP-365B max print width ~76mm → ~576 dots (72 bytes) is common for 80mm class;
        // use 72mm ≈ 576 dots to stay inside printable area.
        public const int MaxWidthDots = 576;

        public static bool PrefersEscPos(string printerName)
        {
            string n = TsplRawPrint.ResolvePrinterName(printerName);
            if (string.IsNullOrWhiteSpace(n)) return false;
            n = n.ToLowerInvariant();
            string[] keys =
            {
                "xprinter", "xp-", "xp ", "365b", "365bm",
                "rongta", "hprt", "pos-", "pos ", "receipt"
            };
            foreach (var k in keys)
                if (n.Contains(k)) return true;
            return false;
        }

        public static void PrintBitmaps(string printerName, IReadOnlyList<Bitmap> pages, int copies, string docName)
        {
            if (pages == null || pages.Count == 0) return;
            copies = Math.Max(1, Math.Min(99, copies));

            using var ms = new MemoryStream();
            // ESC @ — initialize
            ms.WriteByte(0x1B);
            ms.WriteByte(0x40);
            // Align left — full-width raster already fills the paper
            ms.WriteByte(0x1B);
            ms.WriteByte(0x61);
            ms.WriteByte(0x00);

            for (int c = 0; c < copies; c++)
            {
                foreach (var page in pages)
                {
                    if (page == null) continue;
                    WriteRaster(ms, page);
                    // Feed blank paper under footer before cut
                    ms.WriteByte(0x1B);
                    ms.WriteByte(0x64);
                    ms.WriteByte(0x05);
                }
            }

            // Partial cut if supported (GS V 0)
            ms.WriteByte(0x1D);
            ms.WriteByte(0x56);
            ms.WriteByte(0x00);

            byte[] payload = ms.ToArray();
            try
            {
                Directory.CreateDirectory("Logs");
                File.WriteAllBytes(Path.Combine("Logs", "last_escpos_job.bin"), payload);
            }
            catch { }

            RawPrinterHelper.SendBytes(
                TsplRawPrint.ResolvePrinterName(printerName) ?? printerName,
                payload,
                docName);
        }

        public static void PrintBitmap(string printerName, Bitmap page, int copies, string docName)
            => PrintBitmaps(printerName, new[] { page }, copies, docName);

        /// <summary>GS v 0 — print raster bit image.</summary>
        private static void WriteRaster(Stream stream, Bitmap source)
        {
            using var scaled = FitWidth(source, MaxWidthDots);
            PackBitmap(scaled, out int widthBytes, out int height, out byte[] data);

            // GS v 0 m xL xH yL yH d1..dk
            stream.WriteByte(0x1D);
            stream.WriteByte(0x76);
            stream.WriteByte(0x30);
            stream.WriteByte(0x00); // m = normal
            stream.WriteByte((byte)(widthBytes & 0xFF));
            stream.WriteByte((byte)((widthBytes >> 8) & 0xFF));
            stream.WriteByte((byte)(height & 0xFF));
            stream.WriteByte((byte)((height >> 8) & 0xFF));
            stream.Write(data, 0, data.Length);
        }

        private static Bitmap FitWidth(Bitmap source, int targetWidth)
        {
            targetWidth = Math.Max(8, targetWidth);
            if (source.Width == targetWidth)
                return new Bitmap(source);

            int h = Math.Max(1, (int)Math.Round(source.Height * (targetWidth / (double)source.Width)));
            var bmp = new Bitmap(targetWidth, h, PixelFormat.Format24bppRgb);
            using (var g = Graphics.FromImage(bmp))
            {
                g.Clear(Color.White);
                g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.NearestNeighbor;
                g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;
                g.DrawImage(source, 0, 0, targetWidth, h);
            }
            return bmp;
        }

        /// <summary>
        /// ESC/POS raster: 8 pixels/byte, MSB = leftmost, bit 1 = black.
        /// </summary>
        private static void PackBitmap(Bitmap source, out int widthBytes, out int height, out byte[] data)
        {
            using var bmp = Ensure24(source);
            int w = bmp.Width;
            height = bmp.Height;
            widthBytes = (w + 7) / 8;
            data = new byte[widthBytes * height];

            var rect = new Rectangle(0, 0, w, height);
            var bd = bmp.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format24bppRgb);
            try
            {
                int stride = Math.Abs(bd.Stride);
                byte[] rowBuf = new byte[stride];
                for (int y = 0; y < height; y++)
                {
                    System.Runtime.InteropServices.Marshal.Copy(
                        IntPtr.Add(bd.Scan0, y * bd.Stride), rowBuf, 0, stride);
                    int destRow = y * widthBytes;
                    for (int x = 0; x < w; x++)
                    {
                        int i = x * 3;
                        int lum = (rowBuf[i + 2] * 30 + rowBuf[i + 1] * 59 + rowBuf[i] * 11) / 100;
                        // Higher threshold → thicker strokes from antialiased glyphs
                        if (lum < 190)
                            data[destRow + (x >> 3)] |= (byte)(0x80 >> (x & 7));
                    }
                }
            }
            finally
            {
                bmp.UnlockBits(bd);
            }
        }

        private static Bitmap Ensure24(Bitmap source)
        {
            if (source.PixelFormat == PixelFormat.Format24bppRgb)
                return new Bitmap(source);

            var bmp = new Bitmap(source.Width, source.Height, PixelFormat.Format24bppRgb);
            using (var g = Graphics.FromImage(bmp))
            {
                g.Clear(Color.White);
                g.DrawImage(source, 0, 0, source.Width, source.Height);
            }
            return bmp;
        }

        /// <summary>Render a short diagnostic receipt bitmap for live printer tests.</summary>
        public static Bitmap CreateTestBitmap(string line2 = null)
        {
            int w = MaxWidthDots;
            var bmp = new Bitmap(w, 260, PixelFormat.Format24bppRgb);
            using var g = Graphics.FromImage(bmp);
            g.Clear(Color.White);
            g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;
            using var fH = new Font("Consolas", 22f, FontStyle.Bold);
            using var fS = new Font("Consolas", 14f, FontStyle.Bold);
            var center = new StringFormat { Alignment = StringAlignment.Center };
            g.DrawString("PANACHE TEST", fH, Brushes.Black, new RectangleF(0, 24, w, 36), center);
            g.DrawString("ESC/POS OK — LARGE", fS, Brushes.Black, new RectangleF(0, 70, w, 28), center);
            g.DrawString(DateTime.Now.ToString("g"), fS, Brushes.Black, new RectangleF(0, 110, w, 28), center);
            if (!string.IsNullOrWhiteSpace(line2))
                g.DrawString(line2, fS, Brushes.Black, new RectangleF(16, 150, w - 32, 48), center);
            g.DrawRectangle(new Pen(Color.Black, 2f), 6, 6, w - 13, 247);
            return bmp;
        }
    }
}
