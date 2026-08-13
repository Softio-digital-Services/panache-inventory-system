using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Printing;
using System.Linq;

namespace InventorySystem.Helpers
{
    /// <summary>
    /// Shared helpers for thermal-safe GDI printing.
    /// Cheap TSC/XPrinter drivers often mis-handle GDI text and dump TSPL
    /// BITMAP commands as plain text — printing a single raster image avoids that.
    /// </summary>
    internal static class ThermalPrintUtil
    {
        public static bool LooksLikeThermalPrinter(string printerName)
        {
            if (string.IsNullOrWhiteSpace(printerName)) return false;
            string n = printerName.ToLowerInvariant();
            string[] keys =
            {
                "thermal", "receipt", "pos-", "pos ", "xprinter", "xp-", "tsc", "godex",
                "zebra", "citizen", "epson tm", "tm-", "bixolon", "star ", "rongta",
                "hprt", "gainscha", "label", "barcode printer", "tsp"
            };
            return keys.Any(k => n.Contains(k));
        }

        public static void ApplyPrinter(PrintDocument pd, string printerName, int copies, bool landscape, bool color)
        {
            if (!string.IsNullOrWhiteSpace(printerName))
            {
                try { pd.PrinterSettings.PrinterName = printerName; } catch { }
            }
            try { pd.PrinterSettings.Copies = (short)Math.Max(1, Math.Min(99, copies)); } catch { }
            try { pd.PrinterSettings.PrintToFile = false; } catch { }
            pd.DefaultPageSettings.Landscape = landscape;
            pd.DefaultPageSettings.Color = color;
            pd.OriginAtMargins = false;
        }

        /// <summary>Draw a pre-rendered page bitmap into the printable area.</summary>
        public static void DrawPageBitmap(Graphics g, Bitmap page, Rectangle bounds)
        {
            if (page == null || bounds.Width < 8 || bounds.Height < 8) return;
            g.InterpolationMode = InterpolationMode.NearestNeighbor;
            g.PixelOffsetMode = PixelOffsetMode.Half;
            g.SmoothingMode = SmoothingMode.None;
            g.Clear(Color.White);
            g.DrawImage(page, bounds);
        }

        public static Bitmap ToMonoBitmap(Bitmap source)
        {
            if (source == null) return null;
            // 1bpp helps many thermal drivers; fall back to clone if conversion fails
            try
            {
                var rect = new Rectangle(0, 0, source.Width, source.Height);
                using var tmp = new Bitmap(source.Width, source.Height, PixelFormat.Format24bppRgb);
                using (var g = Graphics.FromImage(tmp))
                {
                    g.Clear(Color.White);
                    g.DrawImage(source, 0, 0, source.Width, source.Height);
                }

                var mono = new Bitmap(tmp.Width, tmp.Height, PixelFormat.Format1bppIndexed);
                var bmpData = mono.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format1bppIndexed);
                try
                {
                    int stride = bmpData.Stride;
                    int bytes = Math.Abs(stride) * mono.Height;
                    // Format1bppIndexed: bit 0 = palette[0]=Black, bit 1 = palette[1]=White
                    byte[] buffer = new byte[bytes];
                    for (int i = 0; i < buffer.Length; i++) buffer[i] = 0xFF; // start white
                    for (int y = 0; y < tmp.Height; y++)
                    {
                        for (int x = 0; x < tmp.Width; x++)
                        {
                            Color c = tmp.GetPixel(x, y);
                            int lum = (c.R * 30 + c.G * 59 + c.B * 11) / 100;
                            if (lum < 160)
                            {
                                int index = y * stride + (x >> 3);
                                buffer[index] &= (byte)~(0x80 >> (x & 7)); // clear bit → black
                            }
                        }
                    }
                    System.Runtime.InteropServices.Marshal.Copy(buffer, 0, bmpData.Scan0, bytes);
                }
                finally
                {
                    mono.UnlockBits(bmpData);
                }
                return mono;
            }
            catch
            {
                return new Bitmap(source);
            }
        }
    }
}
