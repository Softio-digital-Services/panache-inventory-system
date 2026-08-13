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
        /// <summary>auto | tspl | gdi — blank/auto uses saved profile then heuristics.</summary>
        public string Protocol { get; set; }
        public double? LabelWidthMm { get; set; }
        public double? LabelHeightMm { get; set; }
        public double? LabelGapMm { get; set; }
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
        private static bool _thermalOneLabelMode;
        private static Bitmap _currentLabelBmp;

        // Label cell size in hundredths of an inch (~2.2" × 1.15")
        private const int LabelWidth = 220;
        private const int LabelHeight = 115;
        private const int GapX = 12;
        private const int GapY = 12;
        private const int Cols = 3;
        private const int RenderDpi = 203;

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

        public static void PrintLabels(List<LabelPrintItem> items, LabelPrintOptions options, IWin32Window owner = null)
        {
            if (items == null || items.Count == 0) return;
            options ??= new LabelPrintOptions();

            // Resolve blank "System printer…" to Windows default (usually Xprinter)
            if (string.IsNullOrWhiteSpace(options.PrinterName))
                options.PrinterName = TsplRawPrint.ResolvePrinterName(null);

            if (!string.IsNullOrWhiteSpace(options.Protocol)
                || options.LabelWidthMm.HasValue
                || options.LabelHeightMm.HasValue
                || options.LabelGapMm.HasValue)
            {
                PrinterProfileStore.Remember(
                    options.PrinterName,
                    labelProtocol: options.Protocol,
                    labelWidthMm: options.LabelWidthMm,
                    labelHeightMm: options.LabelHeightMm,
                    labelGapMm: options.LabelGapMm);
            }

            var mode = PrinterProfileStore.ResolveLabelProtocol(options.PrinterName, options.Protocol);

            // Dual-mode Xprinter / TSPL labels — only when protocol says so
            if (mode == PrintProtocol.Tspl)
            {
                PrintLabelsForThermal(items, options);
                return;
            }

            PrintDocument pd = BuildDocument(items, options);
            try
            {
                pd.Print();
            }
            finally
            {
                pd.Dispose();
                DisposeLabelBmp();
            }
        }

        /// <summary>
        /// Label mode only: TSPL (minimal BAR/BOX/BARCODE) → CPCL → GDI.
        /// Never ESC/POS (that is for receipts).
        /// </summary>
        private static void PrintLabelsForThermal(List<LabelPrintItem> items, LabelPrintOptions options)
        {
            var queue = ExpandQueue(items);
            var allowed = ParsePageRange(options.PageRange);
            _grayscale = !options.Color;

            var printItems = new List<LabelPrintItem>();
            int pageNo = 0;
            foreach (var item in queue)
            {
                pageNo++;
                if (allowed != null && !allowed.Contains(pageNo))
                    continue;
                printItems.Add(item);
            }

            if (printItems.Count == 0)
                throw new InvalidOperationException("No labels to print for the selected page range.");

            int copies = Math.Max(1, options.Copies);
            var profile = PrinterProfileStore.Get(options.PrinterName);
            double wMm = options.LabelWidthMm ?? profile.LabelWidthMm;
            double hMm = options.LabelHeightMm ?? profile.LabelHeightMm;
            double gapMm = options.LabelGapMm ?? profile.LabelGapMm;
            if (wMm < 20) wMm = TsplRawPrint.DefaultWidthMm;
            if (hMm < 15) hMm = TsplRawPrint.DefaultHeightMm;
            if (gapMm < 0) gapMm = TsplRawPrint.DefaultGapMm;

            var labels = new List<(string, string, string)>();
            foreach (var item in printItems)
            {
                labels.Add((
                    item.Name ?? "",
                    string.IsNullOrWhiteSpace(item.SKU) ? (item.Name ?? "0") : item.SKU,
                    CurrencyService.Format(item.Price)));
            }

            var errors = new List<string>();

            // 1) Minimal TSPL (+ CPCL inside PrintNativeLabels)
            try
            {
                TsplRawPrint.PrintNativeLabels(
                    options.PrinterName, labels, wMm, hMm, copies, "Panache Labels", gapMm);
                return;
            }
            catch (Exception ex) { errors.Add("TSPL/CPCL: " + ex.Message); }

            // 2) GDI via official driver with label page size
            var labelPages = new List<Bitmap>();
            try
            {
                foreach (var item in printItems)
                    labelPages.Add(RenderLabelBitmapForTspl(item, wMm, hMm));
                PrintLabelsViaGdi(options.PrinterName, labelPages, copies, wMm, hMm);
                return;
            }
            catch (Exception ex) { errors.Add("GDI: " + ex.Message); }
            finally
            {
                foreach (var b in labelPages)
                {
                    try { b.Dispose(); } catch { }
                }
            }

            throw new InvalidOperationException(
                "Barcode label print failed:\n- " + string.Join("\n- ", errors) +
                "\n\nUse LABEL mode + thermal gap labels (~50×30 mm)." +
                "\nIf still blank: labels may be non-thermal or loaded upside-down.");
        }

        private static void PrintLabelsViaGdi(
            string printerName, List<Bitmap> pages, int copies, double widthMm, double heightMm)
        {
            if (pages == null || pages.Count == 0) return;
            copies = Math.Max(1, Math.Min(99, copies));

            int wHi = Math.Max(50, (int)Math.Round(widthMm / 25.4 * 100));
            int hHi = Math.Max(50, (int)Math.Round(heightMm / 25.4 * 100));

            for (int c = 0; c < copies; c++)
            {
                int index = 0;
                using var pd = new PrintDocument();
                ThermalPrintUtil.ApplyPrinter(pd, printerName, 1, false, true);
                try
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("BarcodeLabel", wHi, hHi);
                }
                catch
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("Label", wHi, hHi);
                }
                pd.DefaultPageSettings.Margins = new Margins(0, 0, 0, 0);
                pd.OriginAtMargins = false;

                pd.PrintPage += (s, e) =>
                {
                    e.HasMorePages = false;
                    if (index >= pages.Count) return;
                    var bmp = pages[index++];
                    var dest = e.PageBounds;
                    if (dest.Width < 8 || dest.Height < 8)
                        dest = e.MarginBounds;
                    e.Graphics.InterpolationMode = InterpolationMode.NearestNeighbor;
                    e.Graphics.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;
                    e.Graphics.Clear(Color.White);
                    e.Graphics.DrawImage(bmp, dest);
                    e.HasMorePages = index < pages.Count;
                };

                pd.Print();
            }
        }

        /// <summary>High-res label bitmap sized to physical mm at 203 DPI for TSPL.</summary>
        private static Bitmap RenderLabelBitmapForTspl(LabelPrintItem item, double widthMm, double heightMm)
        {
            int wPx = TsplRawPrint.MmToDots(widthMm);
            int hPx = TsplRawPrint.MmToDots(heightMm);
            // Width must be multiple of 8 for clean TSPL packing
            wPx = (wPx + 7) / 8 * 8;

            var bmp = new Bitmap(wPx, hPx, System.Drawing.Imaging.PixelFormat.Format24bppRgb);
            using (var g = Graphics.FromImage(bmp))
            {
                g.Clear(Color.White);
                g.SmoothingMode = SmoothingMode.None;
                g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;
                DrawLabel(g, item, new Rectangle(0, 0, wPx, hPx), largeThermal: true);
            }
            return bmp;
        }

        private static PrintDocument BuildDocument(List<LabelPrintItem> items, LabelPrintOptions options)
        {
            _printQueue = ExpandQueue(items);
            _queueIndex = 0;
            _pageNumber = 0;
            _allowedPages = ParsePageRange(options.PageRange);
            _grayscale = !options.Color;
            _thermalOneLabelMode = ThermalPrintUtil.LooksLikeThermalPrinter(options.PrinterName);

            PrintDocument pd = new PrintDocument();
            ThermalPrintUtil.ApplyPrinter(pd, options.PrinterName, options.Copies, options.Landscape, options.Color);

            if (_thermalOneLabelMode)
            {
                // One physical label per page — avoids A4→TSPL conversion dumping BITMAP text
                try
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("BarcodeLabel", LabelWidth, LabelHeight);
                }
                catch
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("Label", LabelWidth, LabelHeight);
                }
                pd.DefaultPageSettings.Margins = new Margins(4, 4, 4, 4);
                pd.DefaultPageSettings.Landscape = false;
                TrySelectLabelPaper(pd);
            }
            else
            {
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
            }

            pd.PrintPage += Pd_PrintPage;
            return pd;
        }

        private static void TrySelectLabelPaper(PrintDocument pd)
        {
            try
            {
                PaperSize best = null;
                int bestScore = int.MaxValue;
                foreach (PaperSize ps in pd.PrinterSettings.PaperSizes)
                {
                    // Prefer small label stock close to our label size
                    if (ps.Width < 150 || ps.Width > 400) continue;
                    if (ps.Height < 80 || ps.Height > 500) continue;
                    int score = Math.Abs(ps.Width - LabelWidth) + Math.Abs(ps.Height - LabelHeight);
                    if (score < bestScore)
                    {
                        bestScore = score;
                        best = ps;
                    }
                }
                if (best != null)
                    pd.DefaultPageSettings.PaperSize = best;
            }
            catch { }
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

            if (_thermalOneLabelMode)
            {
                // Skip pages outside range without drawing
                while (!include && _queueIndex < _printQueue.Count)
                {
                    _queueIndex++;
                    _pageNumber++;
                    include = _allowedPages == null || _allowedPages.Contains(_pageNumber);
                }

                if (_queueIndex >= _printQueue.Count)
                {
                    e.HasMorePages = false;
                    return;
                }

                DisposeLabelBmp();
                _currentLabelBmp = RenderLabelBitmap(_printQueue[_queueIndex]);
                _queueIndex++;

                Rectangle bounds = e.MarginBounds;
                if (bounds.Width < 10 || bounds.Height < 10)
                    bounds = e.PageBounds;

                ThermalPrintUtil.DrawPageBitmap(e.Graphics, _currentLabelBmp, bounds);
                e.HasMorePages = _queueIndex < _printQueue.Count;
                return;
            }

            // Office / A4 multi-label sheet
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.Clear(Color.White);

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

            if (!include && _queueIndex < _printQueue.Count)
            {
                e.HasMorePages = true;
                return;
            }

            if (_allowedPages != null && _queueIndex < _printQueue.Count)
            {
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

        private static Bitmap RenderLabelBitmap(LabelPrintItem item)
        {
            int wPx = Math.Max(120, (int)(LabelWidth / 100.0 * RenderDpi));
            int hPx = Math.Max(60, (int)(LabelHeight / 100.0 * RenderDpi));
            var bmp = new Bitmap(wPx, hPx);
            using (var g = Graphics.FromImage(bmp))
            {
                g.Clear(Color.White);
                g.SmoothingMode = SmoothingMode.None;
                g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.SingleBitPerPixelGridFit;
                DrawLabel(g, item, new Rectangle(0, 0, wPx, hPx));
            }
            var mono = ThermalPrintUtil.ToMonoBitmap(bmp);
            bmp.Dispose();
            return mono;
        }

        private static void DrawLabel(Graphics g, LabelPrintItem item, Rectangle bounds, bool largeThermal = false)
        {
            Color borderColor = _grayscale ? Color.FromArgb(100, 100, 100) : Color.FromArgb(40, 40, 40);
            Color textColor = Color.Black;
            Color accent = Color.Black;

            using (var border = new Pen(borderColor, largeThermal ? 2f : 1f))
                g.DrawRectangle(border, bounds.X, bounds.Y, bounds.Width - 1, bounds.Height - 1);

            var center = new StringFormat
            {
                Alignment = StringAlignment.Center,
                LineAlignment = StringAlignment.Center,
                Trimming = StringTrimming.EllipsisCharacter
            };

            string name = item.Name ?? "";
            int nameMax = largeThermal ? 32 : 28;
            if (name.Length > nameMax) name = name.Substring(0, nameMax - 3) + "...";
            string code = string.IsNullOrWhiteSpace(item.SKU) ? "—" : item.SKU;
            string priceStr = CurrencyService.Format(item.Price);

            float scale = Math.Min(bounds.Width / 220f, bounds.Height / 115f);
            if (scale <= 0) scale = 1f;
            if (largeThermal) scale = Math.Max(scale, 1.6f);
            float nameSize = Math.Max(largeThermal ? 12f : 7f, 8.5f * scale);
            float skuSize = Math.Max(largeThermal ? 11f : 6f, 7f * scale);
            float priceSize = Math.Max(largeThermal ? 13f : 7f, 9f * scale);
            int pad = Math.Max(largeThermal ? 8 : 3, (int)(4 * scale));
            int barcodeH = Math.Max(largeThermal ? 56 : 28, (int)(42 * scale));

            using (var nameFont = new Font("Consolas", nameSize, FontStyle.Bold))
            using (var skuFont = new Font("Consolas", skuSize, FontStyle.Bold))
            using (var priceFont = new Font("Consolas", priceSize, FontStyle.Bold))
            using (var textBrush = new SolidBrush(textColor))
            using (var accentBrush = new SolidBrush(accent))
            {
                var nameRect = new RectangleF(bounds.X + pad, bounds.Y + pad, bounds.Width - pad * 2, nameSize + 8);
                g.DrawString(name, nameFont, textBrush, nameRect, center);

                try
                {
                    var bs = new BarcodeService();
                    int bwWanted = Math.Max(80, bounds.Width - pad * 4);
                    using (Bitmap barcode = bs.RenderCode128(code == "—" ? "0" : code, bwWanted, barcodeH))
                    {
                        int bw = Math.Min(barcode.Width, bounds.Width - pad * 2);
                        int bh = barcodeH;
                        int bx = bounds.X + (bounds.Width - bw) / 2;
                        int by = bounds.Y + (int)(nameRect.Bottom + 2);
                        g.InterpolationMode = InterpolationMode.NearestNeighbor;
                        g.DrawImage(barcode, new Rectangle(bx, by, bw, bh));
                    }
                }
                catch
                {
                    // If barcode render fails, still show code text
                }

                float afterBarcode = bounds.Y + pad + nameSize + 10 + barcodeH + 4;
                var codeRect = new RectangleF(bounds.X + pad, afterBarcode, bounds.Width - pad * 2, skuSize + 6);
                g.DrawString(code, skuFont, textBrush, codeRect, center);

                var priceRect = new RectangleF(bounds.X + pad, codeRect.Bottom, bounds.Width - pad * 2, priceSize + 8);
                g.DrawString(priceStr, priceFont, accentBrush, priceRect, center);
            }
        }

        private static void DisposeLabelBmp()
        {
            try { _currentLabelBmp?.Dispose(); } catch { }
            _currentLabelBmp = null;
        }
    }
}
