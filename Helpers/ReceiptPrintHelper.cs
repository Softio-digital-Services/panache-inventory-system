using System;
using System.Collections.Generic;
using System.Drawing;
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
        private static ReceiptPrintOptions _opts;

        public static void Print(ReceiptPrintOptions options)
        {
            if (options == null) return;
            _opts = options;

            using (PrintDocument pd = new PrintDocument())
            {
                try
                {
                    // Narrow receipt roll (~80mm) in hundredths of an inch
                    pd.DefaultPageSettings.PaperSize = new PaperSize("Receipt", 315, 1100);
                }
                catch
                {
                    pd.DefaultPageSettings.PaperSize = new PaperSize("Receipt", 315, 1100);
                }
                pd.DefaultPageSettings.Margins = new Margins(10, 10, 10, 10);
                pd.DefaultPageSettings.Landscape = options.Landscape;
                pd.DefaultPageSettings.Color = options.Color;

                if (!string.IsNullOrWhiteSpace(options.PrinterName))
                {
                    try { pd.PrinterSettings.PrinterName = options.PrinterName; } catch { }
                }
                try
                {
                    pd.PrinterSettings.Copies = (short)Math.Max(1, Math.Min(99, options.Copies));
                }
                catch { }

                pd.PrintPage += PrintPage;
                pd.Print();
            }
        }

        private static void PrintPage(object sender, PrintPageEventArgs e)
        {
            var o = _opts ?? new ReceiptPrintOptions();
            Graphics g = e.Graphics;
            Font fH = new Font("Segoe UI", 11f, FontStyle.Bold);
            Font fS = new Font("Segoe UI", 8.5f);
            Font fI = new Font("Consolas", 8f);
            Font fB = new Font("Segoe UI", 9.5f, FontStyle.Bold);

            int m = e.MarginBounds.Left;
            int w = e.MarginBounds.Width;
            int y = e.MarginBounds.Top;
            var center = new StringFormat { Alignment = StringAlignment.Center };
            var right = new StringFormat { Alignment = StringAlignment.Far };
            string sym = string.IsNullOrWhiteSpace(o.CurrencySymbol) ? "$" : o.CurrencySymbol;

            string company = ThemeConfig.CompanyName;
            if (string.IsNullOrWhiteSpace(company)) company = "Otargi";
            g.DrawString(company.ToUpperInvariant(), fH, Brushes.Black, new RectangleF(m, y, w, 22), center);
            y += 24;
            g.DrawString("SALES RECEIPT", fS, Brushes.Black, new RectangleF(m, y, w, 18), center);
            y += 18;
            g.DrawString(DateTime.Now.ToString("g"), fS, Brushes.Black, new RectangleF(m, y, w, 18), center);
            y += 22;
            g.DrawLine(Pens.Black, m, y, m + w, y);
            y += 8;

            if (!string.IsNullOrWhiteSpace(o.CustomerName))
            {
                g.DrawString("Customer: " + o.CustomerName, fS, Brushes.Black, m, y);
                y += 18;
            }
            if (!string.IsNullOrWhiteSpace(o.ShippingTo))
            {
                g.DrawString("Ship to: " + o.ShippingTo.Replace("\r\n", ", ").Replace("\n", ", "), fS, Brushes.Black,
                    new RectangleF(m, y, w, 36));
                y += 36;
            }

            g.DrawString("QTY", fI, Brushes.Black, m, y);
            g.DrawString("ITEM", fI, Brushes.Black, m + 36, y);
            g.DrawString("TOTAL", fI, Brushes.Black, new RectangleF(m, y, w, 16), right);
            y += 16;
            g.DrawLine(Pens.Black, m, y, m + w, y);
            y += 6;

            if (o.Items != null)
            {
                foreach (var it in o.Items)
                {
                    string name = it.Name ?? "";
                    if (name.Length > 22) name = name.Substring(0, 19) + "...";
                    g.DrawString(Math.Max(1, it.Qty).ToString(), fI, Brushes.Black, m, y);
                    g.DrawString(name, fI, Brushes.Black, m + 36, y);
                    g.DrawString(FormatMoney(sym, it.Total), fI, Brushes.Black, new RectangleF(m, y, w, 16), right);
                    y += 16;
                    if (y > e.MarginBounds.Bottom - 120)
                    {
                        e.HasMorePages = true;
                        return;
                    }
                }
            }

            y += 6;
            g.DrawLine(Pens.Black, m, y, m + w, y);
            y += 8;

            void Row(string label, decimal amount, bool bold = false)
            {
                var font = bold ? fB : fS;
                g.DrawString(label, font, Brushes.Black, m, y);
                g.DrawString(FormatMoney(sym, amount), font, Brushes.Black, new RectangleF(m, y, w, 18), right);
                y += 18;
            }

            Row("Subtotal", o.Subtotal);
            if (o.Vat > 0.009m) Row("VAT", o.Vat);
            if (o.Shipping > 0.009m) Row("Shipping", o.Shipping);
            if (o.Discount > 0.009m) Row("Discount", -o.Discount);
            y += 4;
            g.DrawLine(Pens.Black, m, y, m + w, y);
            y += 8;
            Row("TOTAL", o.Total, true);
            y += 16;
            g.DrawString("Thank you!", fS, Brushes.Black, new RectangleF(m, y, w, 18), center);
            e.HasMorePages = false;
        }

        private static string FormatMoney(string symbol, decimal amount)
        {
            return $"{symbol}{amount:0.00}";
        }
    }
}
