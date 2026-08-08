using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;
using System.Windows.Forms;
using InventorySystem.Services;

namespace InventorySystem.Helpers
{
    public class LabelPrintItem
    {
        public string Name { get; set; }
        public string SKU { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class LabelPrintOptions
    {
        public string PrinterName { get; set; }
        public int Copies { get; set; } = 1;
        public bool Landscape { get; set; }
        public bool Color { get; set; } = true;
        public string PageRange { get; set; } = "all";
    }

    public class ThermalLabelHelper
    {
        private static List<LabelPrintItem> _printQueue;
        private static int _queueIndex;
        private static int _pageNumber;
        private static HashSet<int> _allowedPages;
        private static bool _grayscale;

        // Label cell size in hundredths of an inch (~2.2" × 1.15")
        private const int LabelWidth = 220;
        private const int LabelHeight = 115;
        private const int GapX = 12;
        private const int GapY = 12;
        private const int Cols = 3;

        /// <summary>
        /// Opens a compact themed PrintPreviewDialog (legacy path).
        /// </summary>
        public static void GenerateLabelPDF(List<LabelPrintItem> items, IWin32Window owner = null)
        {
            if (items == null || items.Count == 0) return;

            PrintDocument pd = BuildDocument(items, new LabelPrintOptions());

            using (PrintPreviewDialog preview = new PrintPreviewDialog())
            {
                preview.Document = pd;
                preview.Text = LocalizationManager.GetString("ThermalLabel_PreviewTitle", "Label Preview");
                if (owner is Form ownerForm)
                    preview.Owner = ownerForm;

                ThemeConfig.ApplyPrintPreviewTheme(preview);

                if (owner != null)
                    preview.ShowDialog(owner);
                else
                    preview.ShowDialog();
            }
        }

        /// <summary>
        /// Prints labels directly using the chosen printer and options (no Chromium dialog).
        /// </summary>
        public static void PrintLabels(List<LabelPrintItem> items, LabelPrintOptions options, IWin32Window owner = null)
        {
            if (items == null || items.Count == 0) return;
            options ??= new LabelPrintOptions();

            PrintDocument pd = BuildDocument(items, options);
            try
            {
                pd.Print();
            }
            finally
            {
                pd.Dispose();
            }
        }

        private static PrintDocument BuildDocument(List<LabelPrintItem> items, LabelPrintOptions options)
        {
            _printQueue = ExpandQueue(items);
            _queueIndex = 0;
            _pageNumber = 0;
            _allowedPages = ParsePageRange(options.PageRange);
            _grayscale = !options.Color;

            PrintDocument pd = new PrintDocument();
            try
            {
                pd.DefaultPageSettings.PaperSize = new PaperSize("A4", 827, 1169);
            }
            catch
            {
                pd.DefaultPageSettings.PaperSize = new PaperSize("A4", 827, 1169);
            }
            pd.DefaultPageSettings.Margins = new Margins(40, 40, 40, 40);
            pd.DefaultPageSettings.Landscape = options.Landscape;
            pd.DefaultPageSettings.Color = options.Color;

            if (!string.IsNullOrWhiteSpace(options.PrinterName))
            {
                try
                {
                    pd.PrinterSettings.PrinterName = options.PrinterName;
                }
                catch { }
            }

            int copies = Math.Max(1, Math.Min(99, options.Copies));
            try
            {
                pd.PrinterSettings.Copies = (short)copies;
            }
            catch { }

            pd.PrintPage += Pd_PrintPage;
            return pd;
        }

        private static HashSet<int> ParsePageRange(string range)
        {
            if (string.IsNullOrWhiteSpace(range) ||
                range.Trim().Equals("all", StringComparison.OrdinalIgnoreCase))
                return null;

            var set = new HashSet<int>();
            foreach (var part in range.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries))
            {
                var token = part.Trim();
                if (token.Contains('-'))
                {
                    var ends = token.Split('-');
                    if (ends.Length == 2 &&
                        int.TryParse(ends[0].Trim(), out int a) &&
                        int.TryParse(ends[1].Trim(), out int b))
                    {
                        int lo = Math.Min(a, b);
                        int hi = Math.Max(a, b);
                        for (int i = lo; i <= hi; i++)
                            if (i >= 1) set.Add(i);
                    }
                }
                else if (int.TryParse(token, out int page) && page >= 1)
                {
                    set.Add(page);
                }
            }
            return set.Count > 0 ? set : null;
        }

        private static List<LabelPrintItem> ExpandQueue(List<LabelPrintItem> items)
        {
            var queue = new List<LabelPrintItem>();
            foreach (var item in items)
            {
                int copies = Math.Max(1, item.Quantity);
                for (int i = 0; i < copies; i++)
                {
                    queue.Add(new LabelPrintItem
                    {
                        Name = item.Name,
                        SKU = item.SKU,
                        Price = item.Price,
                        Quantity = 1
                    });
                }
            }
            return queue;
        }

        private static void Pd_PrintPage(object sender, PrintPageEventArgs e)
        {
            if (_printQueue == null || _queueIndex >= _printQueue.Count)
            {
                e.HasMorePages = false;
                return;
            }

            _pageNumber++;
            bool include = _allowedPages == null || _allowedPages.Contains(_pageNumber);

            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;

            Rectangle area = e.MarginBounds;
            int cols = Math.Max(1, Math.Min(Cols, (area.Width + GapX) / (LabelWidth + GapX)));
            int rows = Math.Max(1, (area.Height + GapY) / (LabelHeight + GapY));
            int perPage = cols * rows;

            int drawn = 0;
            while (_queueIndex < _printQueue.Count && drawn < perPage)
            {
                if (include)
                {
                    int col = drawn % cols;
                    int row = drawn / cols;
                    int x = area.Left + col * (LabelWidth + GapX);
                    int y = area.Top + row * (LabelHeight + GapY);
                    DrawLabel(g, _printQueue[_queueIndex], new Rectangle(x, y, LabelWidth, LabelHeight));
                }
                _queueIndex++;
                drawn++;
            }

            // If this page was skipped by range, keep going until an included page or end
            if (!include && _queueIndex < _printQueue.Count)
            {
                e.HasMorePages = true;
                return;
            }

            if (_allowedPages != null && _queueIndex < _printQueue.Count)
            {
                // More labels remain — only continue if any later page is allowed
                int nextPage = _pageNumber + 1;
                int remaining = _printQueue.Count - _queueIndex;
                int maxPage = nextPage + Math.Max(0, (remaining + perPage - 1) / perPage);
                bool anyLeft = false;
                for (int p = nextPage; p <= maxPage; p++)
                {
                    if (_allowedPages.Contains(p)) { anyLeft = true; break; }
                }
                e.HasMorePages = anyLeft;
                return;
            }

            e.HasMorePages = _queueIndex < _printQueue.Count;
        }

        private static void DrawLabel(Graphics g, LabelPrintItem item, Rectangle bounds)
        {
            Color borderColor = _grayscale ? Color.FromArgb(100, 100, 100) : Color.FromArgb(148, 163, 184);
            Color textColor = Color.Black;
            Color accent = _grayscale ? Color.FromArgb(40, 40, 40) : Color.FromArgb(5, 150, 105);

            using (var border = new Pen(borderColor, 1.5f))
                g.DrawRectangle(border, bounds);

            var center = new StringFormat
            {
                Alignment = StringAlignment.Center,
                LineAlignment = StringAlignment.Center,
                Trimming = StringTrimming.EllipsisCharacter
            };

            string name = item.Name ?? "";
            if (name.Length > 28) name = name.Substring(0, 25) + "...";
            string code = string.IsNullOrWhiteSpace(item.SKU) ? "—" : item.SKU;
            string priceStr = CurrencyService.Format(item.Price);

            using (var nameFont = new Font("Segoe UI", 7.5f, FontStyle.Bold))
            using (var skuFont = new Font("Consolas", 6.5f))
            using (var priceFont = new Font("Segoe UI", 8f, FontStyle.Bold))
            using (var textBrush = new SolidBrush(textColor))
            using (var accentBrush = new SolidBrush(accent))
            {
                var nameRect = new RectangleF(bounds.X + 4, bounds.Y + 4, bounds.Width - 8, 16);
                g.DrawString(name, nameFont, textBrush, nameRect, center);

                try
                {
                    var bs = new BarcodeService();
                    using (Bitmap barcode = bs.RenderCode128(code == "—" ? "0" : code, Math.Max(80, bounds.Width - 20), 42))
                    {
                        if (_grayscale)
                        {
                            // Barcodes are already black/white; draw as-is
                        }
                        int bw = Math.Min(barcode.Width, bounds.Width - 16);
                        int bh = 42;
                        int bx = bounds.X + (bounds.Width - bw) / 2;
                        int by = bounds.Y + 22;
                        g.DrawImage(barcode, new Rectangle(bx, by, bw, bh));
                    }
                }
                catch
                {
                    // If barcode render fails, still show code text
                }

                var codeRect = new RectangleF(bounds.X + 4, bounds.Y + 68, bounds.Width - 8, 14);
                g.DrawString(code, skuFont, textBrush, codeRect, center);

                var priceRect = new RectangleF(bounds.X + 4, bounds.Y + 84, bounds.Width - 8, 18);
                g.DrawString(priceStr, priceFont, accentBrush, priceRect, center);
            }
        }
    }
}
