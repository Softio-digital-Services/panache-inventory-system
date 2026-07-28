using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using ClosedXML.Excel;
using InventorySystem.Services;

namespace InventorySystem.Helpers
{
    /// <summary>
    /// Helper class for importing and exporting data to CSV and Excel formats
    /// </summary>
    public static class ImportExportHelper
    {
        #region CSV Export/Import

        /// <summary>
        /// Exports a DataTable to CSV file
        /// </summary>
        public static bool ExportToCsv(DataTable dataTable, string filePath)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                // Write headers
                IEnumerable<string> columnNames = dataTable.Columns.Cast<DataColumn>()
                    .Select(column => EscapeCsvField(column.ColumnName));
                sb.AppendLine(string.Join(",", columnNames));

                // Write rows
                foreach (DataRow row in dataTable.Rows)
                {
                    IEnumerable<string> fields = row.ItemArray
                        .Select(field => EscapeCsvField(field?.ToString() ?? ""));
                    sb.AppendLine(string.Join(",", fields));
                }

                File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
                return true;
            }
            catch (Exception ex)
            {
                ErrorLogger.LogError(ex, "ImportExportHelper.ExportToCsv");
                return false;
            }
        }

        /// <summary>
        /// Imports data from CSV file to DataTable
        /// </summary>
        public static DataTable ImportFromCsv(string filePath)
        {
            try
            {
                DataTable dt = new DataTable();
                string[] lines = File.ReadAllLines(filePath, Encoding.UTF8);

                if (lines.Length == 0)
                    return dt;

                // Parse headers
                string[] headers = ParseCsvLine(lines[0]);
                foreach (string header in headers)
                {
                    dt.Columns.Add(header.Trim());
                }

                // Parse data rows
                for (int i = 1; i < lines.Length; i++)
                {
                    if (string.IsNullOrWhiteSpace(lines[i]))
                        continue;

                    string[] fields = ParseCsvLine(lines[i]);
                    
                    // Ensure we have the right number of fields
                    if (fields.Length == dt.Columns.Count)
                    {
                        dt.Rows.Add(fields);
                    }
                }

                return dt;
            }
            catch (Exception ex)
            {
                ErrorLogger.LogError(ex, "ImportExportHelper.ImportFromCsv");
                return new DataTable();
            }
        }

        #endregion

        #region Excel Export/Import (Simple TSV Format)

        /// <summary>
        /// Exports a DataTable to Excel-compatible TSV file
        /// </summary>
        public static bool ExportToExcel(DataTable dataTable, string filePath, string sheetName = "Sheet1")
        {
            try
            {
                // For now, export as tab-separated values which Excel can open
                // This avoids the ClosedXML dependency issue
                StringBuilder sb = new StringBuilder();

                // Write headers
                IEnumerable<string> columnNames = dataTable.Columns.Cast<DataColumn>()
                    .Select(column => column.ColumnName);
                sb.AppendLine(string.Join("\t", columnNames));

                // Write rows
                foreach (DataRow row in dataTable.Rows)
                {
                    IEnumerable<string> fields = row.ItemArray
                        .Select(field => field?.ToString()?.Replace("\t", " ") ?? "");
                    sb.AppendLine(string.Join("\t", fields));
                }

                // Save with .xls extension (Excel will open TSV files)
                string tsvPath = filePath.Replace(".xlsx", ".xls");
                File.WriteAllText(tsvPath, sb.ToString(), Encoding.UTF8);
                return true;
            }
            catch (Exception ex)
            {
                ErrorLogger.LogError(ex, "ImportExportHelper.ExportToExcel");
                return false;
            }
        }

        /// <summary>
        /// Imports data from Excel-compatible TSV file to DataTable
        /// </summary>
        public static DataTable ImportFromExcel(string filePath, string sheetName = null)
        {
            try
            {
                DataTable dt = new DataTable();
                string[] lines = File.ReadAllLines(filePath, Encoding.UTF8);

                if (lines.Length == 0)
                    return dt;

                // Parse headers
                string[] headers = lines[0].Split('\t');
                foreach (string header in headers)
                {
                    dt.Columns.Add(header.Trim());
                }

                // Parse data rows
                for (int i = 1; i < lines.Length; i++)
                {
                    if (string.IsNullOrWhiteSpace(lines[i]))
                        continue;

                    string[] fields = lines[i].Split('\t');
                    
                    // Ensure we have the right number of fields
                    if (fields.Length == dt.Columns.Count)
                    {
                        dt.Rows.Add(fields);
                    }
                }

                return dt;
            }
            catch (Exception ex)
            {
                ErrorLogger.LogError(ex, "ImportExportHelper.ImportFromExcel");
                return new DataTable();
            }
        }

        /// <summary>
        /// Exports a full sales report (summary + sold products) to a real .xlsx workbook.
        /// </summary>
        public static bool ExportSalesReport(
            string filePath,
            SalesReportSummary summary,
            DataTable soldProducts,
            string periodLabel = null)
        {
            try
            {
                string L(string key, string fallback) => LocalizationManager.GetString(key, fallback);
                bool isAr = LocalizationManager.IsArabic;

                using var workbook = new XLWorkbook();
                string sheetName = L("Rep_ExportSheetName", "Sales Report");
                if (sheetName.Length > 31) sheetName = sheetName.Substring(0, 31);
                var ws = workbook.Worksheets.Add(sheetName);
                if (isAr)
                    ws.RightToLeft = true;

                int row = 1;
                ws.Cell(row, 1).Value = L("Rep_Title", "Sales Reports");
                ws.Cell(row, 1).Style.Font.Bold = true;
                ws.Cell(row, 1).Style.Font.FontSize = 16;
                row += 2;

                if (!string.IsNullOrWhiteSpace(periodLabel))
                {
                    ws.Cell(row, 1).Value = L("Rep_ExportPeriodLabel", "Period");
                    ws.Cell(row, 2).Value = periodLabel;
                    row++;
                }

                ws.Cell(row, 1).Value = L("Rep_From", "From");
                ws.Cell(row, 2).Value = summary.FromDate.ToString("yyyy-MM-dd");
                row++;
                ws.Cell(row, 1).Value = L("Rep_To", "To");
                ws.Cell(row, 2).Value = summary.ToDate.ToString("yyyy-MM-dd");
                row += 2;

                ws.Cell(row, 1).Value = L("Rep_ExportSummary", "Summary");
                ws.Cell(row, 1).Style.Font.Bold = true;
                ws.Cell(row, 1).Style.Font.FontSize = 13;
                row++;

                void AddMetric(string label, decimal value)
                {
                    ws.Cell(row, 1).Value = label;
                    ws.Cell(row, 2).Value = value;
                    ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                    row++;
                }

                AddMetric(L("Rep_MonthlyExpenses", "Monthly Expenses"), summary.TotalExpenses);
                AddMetric(L("Rep_ExportTotalCostProducts", "Total Cost of Products"), summary.TotalCost);
                AddMetric(L("Rep_TotalSales", "Total Sales"), summary.TotalSales);
                AddMetric(L("Rep_TotalProfit", "Total Profit"), summary.TotalProfit);
                AddMetric(L("Rep_ProfitAfterExpenses", "Profit After Expenses"), summary.TotalProfitAfterExpenses);
                row++;

                ws.Cell(row, 1).Value = L("Rep_ExportSoldProducts", "Sold Products");
                ws.Cell(row, 1).Style.Font.Bold = true;
                ws.Cell(row, 1).Style.Font.FontSize = 13;
                row++;

                string[] headers =
                {
                    L("Rep_ColProduct", "Product"),
                    L("Rep_ColQuantitySold", "Quantity Sold"),
                    L("Rep_ColUnitPrice", "Unit Price"),
                    L("Rep_ColTotalSales", "Total Sales"),
                    L("Rep_ColTotalCost", "Total Cost"),
                    L("Rep_ColProfit", "Profit")
                };
                for (int c = 0; c < headers.Length; c++)
                {
                    ws.Cell(row, c + 1).Value = headers[c];
                    ws.Cell(row, c + 1).Style.Font.Bold = true;
                    ws.Cell(row, c + 1).Style.Fill.BackgroundColor = XLColor.FromHtml("#F8FAFC");
                }
                row++;

                int dataStart = row;
                if (soldProducts != null)
                {
                    foreach (DataRow dr in soldProducts.Rows)
                    {
                        ws.Cell(row, 1).Value = dr["product_name"]?.ToString() ?? "";
                        ws.Cell(row, 2).Value = Convert.ToDecimal(dr["quantity_sold"] == DBNull.Value ? 0 : dr["quantity_sold"]);
                        ws.Cell(row, 3).Value = Convert.ToDecimal(dr["unit_price"] == DBNull.Value ? 0 : dr["unit_price"]);
                        ws.Cell(row, 4).Value = Convert.ToDecimal(dr["total_sales"] == DBNull.Value ? 0 : dr["total_sales"]);
                        ws.Cell(row, 5).Value = Convert.ToDecimal(dr["total_cost"] == DBNull.Value ? 0 : dr["total_cost"]);
                        ws.Cell(row, 6).Value = Convert.ToDecimal(dr["profit"] == DBNull.Value ? 0 : dr["profit"]);

                        for (int c = 2; c <= 6; c++)
                            ws.Cell(row, c).Style.NumberFormat.Format = "#,##0.00";
                        row++;
                    }
                }

                int dataEnd = row - 1;
                row++;

                ws.Cell(row, 1).Value = L("Rep_ExportFinalTotals", "Final Totals");
                ws.Cell(row, 1).Style.Font.Bold = true;
                row++;

                if (dataEnd >= dataStart)
                {
                    ws.Cell(row, 1).Value = L("Rep_ColQuantitySold", "Quantity Sold");
                    ws.Cell(row, 2).FormulaA1 = $"SUM(B{dataStart}:B{dataEnd})";
                    row++;
                    ws.Cell(row, 1).Value = L("Rep_TotalSales", "Total Sales");
                    ws.Cell(row, 2).FormulaA1 = $"SUM(D{dataStart}:D{dataEnd})";
                    ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                    row++;
                    ws.Cell(row, 1).Value = L("Rep_ColTotalCost", "Total Cost");
                    ws.Cell(row, 2).FormulaA1 = $"SUM(E{dataStart}:E{dataEnd})";
                    ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                    row++;
                    ws.Cell(row, 1).Value = L("Rep_TotalProfit", "Total Profit");
                    ws.Cell(row, 2).FormulaA1 = $"SUM(F{dataStart}:F{dataEnd})";
                    ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                    row++;
                    ws.Cell(row, 1).Value = L("Rep_MonthlyExpenses", "Monthly Expenses");
                    ws.Cell(row, 2).Value = summary.TotalExpenses;
                    ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                    row++;
                    ws.Cell(row, 1).Value = L("Rep_ProfitAfterExpenses", "Profit After Expenses");
                    ws.Cell(row, 2).Value = summary.TotalProfitAfterExpenses;
                    ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                    ws.Cell(row, 1).Style.Font.Bold = true;
                    ws.Cell(row, 2).Style.Font.Bold = true;
                }
                else
                {
                    AddMetric(L("Rep_MonthlyExpenses", "Monthly Expenses"), summary.TotalExpenses);
                    AddMetric(L("Rep_TotalSales", "Total Sales"), summary.TotalSales);
                    AddMetric(L("Rep_TotalProfit", "Total Profit"), summary.TotalProfit);
                    AddMetric(L("Rep_ProfitAfterExpenses", "Profit After Expenses"), summary.TotalProfitAfterExpenses);
                }

                ws.Columns().AdjustToContents();
                workbook.SaveAs(filePath);
                return true;
            }
            catch (Exception ex)
            {
                ErrorLogger.LogError(ex, "ImportExportHelper.ExportSalesReport");
                return false;
            }
        }

        #endregion

        #region Helper Methods

        /// <summary>
        /// Escapes a CSV field by wrapping in quotes if needed
        /// </summary>
        private static string EscapeCsvField(string field)
        {
            if (string.IsNullOrEmpty(field))
                return "";

            // If field contains comma, quote, or newline, wrap in quotes
            if (field.Contains(",") || field.Contains("\"") || field.Contains("\n") || field.Contains("\r"))
            {
                // Escape existing quotes by doubling them
                field = field.Replace("\"", "\"\"");
                return $"\"{field}\"";
            }

            return field;
        }

        /// <summary>
        /// Parses a CSV line handling quoted fields
        /// </summary>
        private static string[] ParseCsvLine(string line)
        {
            List<string> fields = new List<string>();
            bool inQuotes = false;
            StringBuilder currentField = new StringBuilder();

            for (int i = 0; i < line.Length; i++)
            {
                char c = line[i];

                if (c == '"')
                {
                    // Check for escaped quote
                    if (inQuotes && i + 1 < line.Length && line[i + 1] == '"')
                    {
                        currentField.Append('"');
                        i++; // Skip next quote
                    }
                    else
                    {
                        inQuotes = !inQuotes;
                    }
                }
                else if (c == ',' && !inQuotes)
                {
                    fields.Add(currentField.ToString());
                    currentField.Clear();
                }
                else
                {
                    currentField.Append(c);
                }
            }

            // Add last field
            fields.Add(currentField.ToString());

            return fields.ToArray();
        }

        /// <summary>
        /// Creates a sample CSV template file
        /// </summary>
        public static void CreateCsvTemplate(string filePath, string[] headers)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(string.Join(",", headers));
                File.WriteAllText(filePath, sb.ToString(), Encoding.UTF8);
            }
            catch (Exception ex)
            {
                ErrorLogger.LogError(ex, "ImportExportHelper.CreateCsvTemplate");
            }
        }

        #endregion
    }
}
