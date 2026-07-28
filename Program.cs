using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using InventorySystem.Services;
using InventorySystem.Helpers;

namespace InventorySystem
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            if (args != null && args.Length > 0 &&
                args.Any(a => string.Equals(a, "--test-reports", StringComparison.OrdinalIgnoreCase)))
            {
                Environment.Exit(RunReportsSmokeTest());
                return;
            }

            if (args != null && args.Length > 0 &&
                args.Any(a => string.Equals(a, "--test-i18n", StringComparison.OrdinalIgnoreCase)))
            {
                Environment.Exit(RunI18nSmokeTest());
                return;
            }

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            // Load initial language from persisted settings, defaulting to en-US
            string savedLanguage = "en-US";
            try
            {
                string configPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "language.txt");
                if (System.IO.File.Exists(configPath))
                {
                    savedLanguage = System.IO.File.ReadAllText(configPath).Trim();
                }
            }
            catch { }
            InventorySystem.Helpers.LocalizationManager.SetLanguage(savedLanguage);

            // Expose background task for server hosting without blocking UI thread
            _ = Task.Run(() => StartApiServer());

            Application.ThreadException += (s, e) =>
            {
                try { System.IO.File.AppendAllText("crash.txt", DateTime.Now.ToString() + ": " + e.Exception.ToString() + "\n\n"); } catch { }
            };
            AppDomain.CurrentDomain.UnhandledException += (s, e) =>
            {
                try { System.IO.File.AppendAllText("crash.txt", DateTime.Now.ToString() + ": " + e.ExceptionObject.ToString() + "\n\n"); } catch { }
            };

            try
            {
                // Initialize Database (Create if missing)
                InventorySystem.Helpers.DatabaseInitializer.Initialize();

                // Ensure schema is up to date (add missing columns)
                DatabaseHelper.EnsureSchema();

                // Initialize currency tables and load cached rates
                InventorySystem.Services.CurrencyService.EnsureTable();

                // Check License
                if (!InventorySystem.Helpers.LicenseManager.HasValidLicense())
                {
                    // Show activation form
                    InventorySystem.Forms.LicenseActivationForm activationForm = new InventorySystem.Forms.LicenseActivationForm();
                    if (activationForm.ShowDialog() != System.Windows.Forms.DialogResult.OK)
                    {
                        // User cancelled activation - exit application
                        return;
                    }
                }

                // Check for expiring license and show warning
                var license = InventorySystem.Helpers.LicenseManager.GetCurrentLicense();
                if (license != null && license.IsExpiringSoon() && !license.IsTrial())
                {
                    int daysLeft = license.DaysRemaining();
                    InventorySystem.Forms.ModernMessageBox.Show(
                        string.Format(LocalizationManager.GetString("Msg_LicExpiringSoonBody"), daysLeft),
                        LocalizationManager.GetString("Msg_LicExpiringSoon"),
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Warning
                    );
                }

                Application.Run(new LoginForm());
            }
            catch (Exception ex)
            {
                InventorySystem.Forms.ModernMessageBox.Show(
                    string.Format(LocalizationManager.GetString("Msg_CriticalError"), ex.Message) + $"\n\n{LocalizationManager.GetString("Msg_StackTrace")}\n{ex.StackTrace}",
                    LocalizationManager.GetString("Error_AppCrash"),
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
        }

        private static int RunI18nSmokeTest()
        {
            const string logPath = @"c:\Users\Baraa\source\repos\panache-inventory-system\debug-1f5731.log";
            int failures = 0;

            void AgentLog(string hypothesisId, string location, string message, Dictionary<string, object> data)
            {
                // #region agent log
                try
                {
                    var payload = new Dictionary<string, object>
                    {
                        ["sessionId"] = "1f5731",
                        ["runId"] = "i18n-smoke",
                        ["hypothesisId"] = hypothesisId,
                        ["location"] = location,
                        ["message"] = message,
                        ["data"] = data,
                        ["timestamp"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                    };
                    string line = System.Text.Json.JsonSerializer.Serialize(payload) + Environment.NewLine;
                    File.AppendAllText(logPath, line);
                }
                catch { }
                // #endregion
            }

            try
            {
                LocalizationManager.SetLanguage("en-US");
                string enTitle = LocalizationManager.GetString("Rep_Title");
                bool enOk = !string.IsNullOrEmpty(enTitle) && enTitle.Contains("Sales", StringComparison.OrdinalIgnoreCase);
                AgentLog("H1", "Program.RunI18nSmokeTest", "EN Rep_Title", new Dictionary<string, object> { ["value"] = enTitle ?? "", ["ok"] = enOk });
                if (!enOk) failures++;

                LocalizationManager.SetLanguage("ar");
                string arTitle = LocalizationManager.GetString("Rep_Title");
                bool arOk = LocalizationManager.IsArabic && !string.IsNullOrEmpty(arTitle) && arTitle.Contains("تقارير");
                AgentLog("H1", "Program.RunI18nSmokeTest", "AR Rep_Title", new Dictionary<string, object> { ["value"] = arTitle ?? "", ["isArabic"] = LocalizationManager.IsArabic, ["ok"] = arOk });
                if (!arOk) failures++;

                LocalizationManager.SetLanguage("en-US");
                string afterEn = LocalizationManager.GetString("Rep_Title");
                bool switchBackOk = afterEn.Contains("Sales", StringComparison.OrdinalIgnoreCase);
                AgentLog("H2", "Program.RunI18nSmokeTest", "EN after AR toggle", new Dictionary<string, object> { ["value"] = afterEn ?? "", ["ok"] = switchBackOk });
                if (!switchBackOk) failures++;

                var summary = new SalesReportSummary
                {
                    FromDate = DateTime.Today,
                    ToDate = DateTime.Today,
                    TotalSales = 100m,
                    TotalCost = 40m,
                    TotalProfit = 60m,
                    TotalExpenses = 10m,
                    TotalProfitAfterExpenses = 50m
                };
                var detail = new System.Data.DataTable();
                string exportDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "test-exports");
                Directory.CreateDirectory(exportDir);

                LocalizationManager.SetLanguage("ar");
                string arPath = Path.Combine(exportDir, "i18n_ar_export.xlsx");
                bool arExport = ImportExportHelper.ExportSalesReport(arPath, summary, detail, LocalizationManager.GetString("Rep_Period_Monthly"));
                string arCellA1 = "";
                if (arExport && File.Exists(arPath))
                {
                    using var wb = new ClosedXML.Excel.XLWorkbook(arPath);
                    arCellA1 = wb.Worksheet(1).Cell(1, 1).GetString();
                }
                bool arExcelOk = arExport && arCellA1.Contains("تقارير");
                AgentLog("H3", "Program.RunI18nSmokeTest", "AR Excel A1", new Dictionary<string, object> { ["exportOk"] = arExport, ["a1"] = arCellA1, ["ok"] = arExcelOk });
                if (!arExcelOk) failures++;

                LocalizationManager.SetLanguage("en-US");
                string enPath = Path.Combine(exportDir, "i18n_en_export.xlsx");
                bool enExport = ImportExportHelper.ExportSalesReport(enPath, summary, detail, LocalizationManager.GetString("Rep_Period_Monthly"));
                string enCellA1 = "";
                if (enExport && File.Exists(enPath))
                {
                    using var wb = new ClosedXML.Excel.XLWorkbook(enPath);
                    enCellA1 = wb.Worksheet(1).Cell(1, 1).GetString();
                }
                bool enExcelOk = enExport && enCellA1.Contains("Sales", StringComparison.OrdinalIgnoreCase);
                AgentLog("H3", "Program.RunI18nSmokeTest", "EN Excel A1", new Dictionary<string, object> { ["exportOk"] = enExport, ["a1"] = enCellA1, ["ok"] = enExcelOk });
                if (!enExcelOk) failures++;

                string[] navKeys = { "Nav_Inventory", "Nav_Suppliers", "Nav_Quotations", "Nav_Reports", "Nav_Customers" };
                LocalizationManager.SetLanguage("ar");
                var missingAr = new List<string>();
                foreach (var k in navKeys)
                {
                    var v = LocalizationManager.GetString(k);
                    if (string.IsNullOrEmpty(v) || v == k) missingAr.Add(k);
                }
                AgentLog("H4", "Program.RunI18nSmokeTest", "AR nav keys", new Dictionary<string, object> { ["missing"] = string.Join(",", missingAr), ["ok"] = missingAr.Count == 0 });
                if (missingAr.Count > 0) failures++;

                LocalizationManager.SetLanguage("ar");
                string arQuote = LocalizationManager.GetString("QuotePreview_Quote");
                bool quoteArOk = !string.IsNullOrEmpty(arQuote) && arQuote != "QuotePreview_Quote";
                AgentLog("H5", "Program.RunI18nSmokeTest", "AR quotation preview strings", new Dictionary<string, object> { ["QuotePreview_Quote"] = arQuote ?? "", ["ok"] = quoteArOk });
                if (!quoteArOk) failures++;

                Console.WriteLine($"I18N SMOKE: failures={failures} (see {logPath})");
                return failures == 0 ? 0 : 1;
            }
            catch (Exception ex)
            {
                AgentLog("H0", "Program.RunI18nSmokeTest", "exception", new Dictionary<string, object> { ["error"] = ex.Message });
                Console.WriteLine("I18N SMOKE EXCEPTION: " + ex);
                return 2;
            }
        }

        private static int RunReportsSmokeTest()
        {
            try
            {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                LocalizationManager.SetLanguage("en-US");
                DatabaseInitializer.Initialize();
                DatabaseHelper.EnsureSchema();
                CurrencyService.EnsureTable();

                var svc = new ReportService();
                string exportDir = Path.Combine(Application.StartupPath, "Data", "test-exports");
                Directory.CreateDirectory(exportDir);

                string[] presets = { "Daily", "Weekly", "Monthly", "Yearly" };
                int failures = 0;

                foreach (string preset in presets)
                {
                    var (from, to) = svc.GetPresetRange(preset);
                    var summary = svc.GetSummary(from, to);
                    var products = svc.GetTopSellingProducts(from, to, 25);
                    var categories = svc.GetTopSellingCategories(from, to, 25);
                    var detail = svc.GetSoldProductsDetail(from, to);

                    Console.WriteLine($"[{preset}] {from:yyyy-MM-dd}..{to:yyyy-MM-dd}");
                    Console.WriteLine($"  Sales={summary.TotalSales:0.00} Cost={summary.TotalCost:0.00} Expenses={summary.TotalExpenses:0.00} Profit={summary.TotalProfit:0.00} AfterExpenses={summary.TotalProfitAfterExpenses:0.00}");
                    Console.WriteLine($"  Products={products.Rows.Count} Categories={categories.Rows.Count} DetailRows={detail.Rows.Count}");

                    if (preset is "Monthly" or "Yearly" or "Weekly")
                    {
                        if (summary.TotalSales <= 0 || products.Rows.Count == 0 || categories.Rows.Count == 0)
                        {
                            Console.WriteLine($"  FAIL: expected seeded sales data for {preset}");
                            failures++;
                        }
                    }

                    string path = Path.Combine(exportDir, $"report_{preset}_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
                    bool ok = ImportExportHelper.ExportSalesReport(path, summary, detail, preset);
                    if (!ok || !File.Exists(path))
                    {
                        Console.WriteLine($"  FAIL: export failed for {preset}");
                        failures++;
                    }
                    else
                    {
                        Console.WriteLine($"  Export OK: {path} ({new FileInfo(path).Length} bytes)");
                    }
                }

                // Custom range spanning full year
                var customFrom = new DateTime(DateTime.Today.Year, 1, 1);
                var customTo = DateTime.Today;
                var custom = svc.GetSummary(customFrom, customTo);
                Console.WriteLine($"[Custom] Sales={custom.TotalSales:0.00}");
                if (custom.TotalSales <= 0)
                {
                    Console.WriteLine("  FAIL: custom yearly range empty");
                    failures++;
                }

                // Host ReportsForm briefly to ensure UI constructs without throw
                using (var host = new Form { Width = 1200, Height = 800 })
                {
                    var reports = new Forms.ReportsForm { Dock = DockStyle.Fill };
                    host.Controls.Add(reports);
                    host.Show();
                    reports.RefreshData();
                    Application.DoEvents();
                    System.Threading.Thread.Sleep(400);
                    host.Close();
                }
                Console.WriteLine("ReportsForm construct+RefreshData OK");

                if (failures == 0)
                {
                    Console.WriteLine("REPORTS SMOKE TEST PASSED");
                    return 0;
                }

                Console.WriteLine($"REPORTS SMOKE TEST FAILED ({failures} issues)");
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine("REPORTS SMOKE TEST EXCEPTION: " + ex);
                return 2;
            }
        }

        private static void StartApiServer()
        {
            try
            {
                string certPath = System.IO.Path.Combine(Application.StartupPath, "Database", "pos_cert.pfx");
                const string certPassword = "SoftioPos2026!";

                var builder = WebApplication.CreateBuilder();

                // Configure Kestrel for both HTTP and HTTPS
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.ListenAnyIP(5000); // HTTP
                    if (System.IO.File.Exists(certPath))
                    {
                        options.ListenAnyIP(5001, listenOptions =>
                        {
                            listenOptions.UseHttps(certPath, certPassword);
                        });
                    }
                });

                builder.Services.AddCors(c => c.AddDefaultPolicy(p =>
                    p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

                // - SignalR for real-time sync -
                builder.Services.AddSignalR();

                var app = builder.Build();

                // --- Discovery Logic ---
                string localIp = "localhost";
                try
                {
                    var host = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName());
                    localIp = host.AddressList.FirstOrDefault(ip => ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)?.ToString() ?? "localhost";
                }
                catch { }

                // Register HubContext so WinForms can broadcast events
                InventoryBroadcaster.HubContext = app.Services
                    .GetRequiredService<Microsoft.AspNetCore.SignalR.IHubContext<InventoryHub>>();

                app.UseCors();

                // Camera requires HTTPS OR the Chrome Flag (chrome://flags/#unsafely-treat-insecure-origin-as-secure)
                // We'll allow both HTTP and HTTPS to co-exist for easier access
                // if (!builder.Environment.IsDevelopment()) { app.UseHsts(); }
                // app.UseHttpsRedirection();

                app.UseDefaultFiles();
                app.UseStaticFiles();

                // Serve desktop assets to the web portal
                string assetsPath = System.IO.Path.Combine(builder.Environment.ContentRootPath, "Assets");
                if (System.IO.Directory.Exists(assetsPath))
                {
                    app.UseStaticFiles(new Microsoft.AspNetCore.Builder.StaticFileOptions
                    {
                        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(assetsPath),
                        RequestPath = "/Assets"
                    });
                }

                // - SignalR Hub endpoint -
                app.MapHub<InventoryHub>("/hubs/inventory");

                // - Status -
                app.MapGet("/api/status", () => Microsoft.AspNetCore.Http.Results.Ok(new { status = "API Running", version = "2.0", realtime = "SignalR Active" }));

                // - Config/Language -
                app.MapGet("/api/config", () => Microsoft.AspNetCore.Http.Results.Ok(new
                {
                    language = LocalizationManager.IsArabic ? "ar" : "en",
                    isArabic = LocalizationManager.IsArabic,
                    primaryColor = System.Drawing.ColorTranslator.ToHtml(ThemeConfig.PrimaryColor),
                    primaryRgb = $"{ThemeConfig.PrimaryColor.R}, {ThemeConfig.PrimaryColor.G}, {ThemeConfig.PrimaryColor.B}"
                }));

                // Wire up dynamic language broadcast to connected web portals
                LocalizationManager.LanguageChanged += (s, e) =>
                {
                    _ = InventoryBroadcaster.Broadcast("LanguageChanged", LocalizationManager.IsArabic ? "ar" : "en");
                };

                // - Products (live from DB) -
                app.MapGet("/api/products", () =>
                {
                    try
                    {
                        var dt = DatabaseHelper.ExecuteDataTable(
                            @"SELECT p.id, p.part_name, p.selling_price, p.quantity_in_stock,
                                     p.minimum_stock_level, p.barcode, p.part_number, p.part_image,
                                     COALESCE(c.category_name, 'General') AS category,
                                     c.category_image
                              FROM parts p
                              LEFT JOIN categories c ON p.category_id = c.id
                              WHERE p.date_deleted IS NULL AND p.status = 'Active'
                              ORDER BY c.category_name, p.part_name");

                        var products = new System.Collections.Generic.List<object>();
                        foreach (System.Data.DataRow row in dt.Rows)
                        {
                            string partImage = row["part_image"].ToString();
                            string catImage = row["category_image"].ToString();
                            string category = row["category"].ToString();

                            // Fully dynamic category icon resolution
                            if (string.IsNullOrEmpty(catImage))
                            {
                                string cleanCat = category.ToLower().Trim();

                                // Try finding a matching icon (SVG preferred, then PNG)
                                string[] extensions = { ".svg", ".png" };
                                bool found = false;

                                foreach (var ext in extensions)
                                {
                                    string iconFile = $"nuricon_{cleanCat}{ext}";
                                    if (System.IO.File.Exists(System.IO.Path.Combine(assetsPath, iconFile)))
                                    {
                                        catImage = "/Assets/" + iconFile;
                                        found = true;
                                        break;
                                    }
                                }

                                if (!found)
                                {
                                    // Fallback to specific keywords based on actual file existence
                                    if (cleanCat.Contains("service")) catImage = "/Assets/nuricon_pos.png";
                                    else if (cleanCat.Contains("accessory")) catImage = "/Assets/nuricon_inventory.svg";
                                    else if (cleanCat.Contains("engine")) catImage = "/Assets/nuricon_inventory.svg";
                                    else if (cleanCat.Contains("brake")) catImage = "/Assets/nuricon_inventory.svg";
                                    else catImage = "/Assets/nuricon_inventory.svg"; // Final default
                                }
                            }
                            else
                            {
                                // Clean up catImage: prevent /Assets/Assets/ double prefix
                                if (catImage.StartsWith("Assets/", StringComparison.OrdinalIgnoreCase))
                                    catImage = "/" + catImage;
                                else if (!catImage.StartsWith("/") && !catImage.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                                    catImage = "/Assets/" + catImage;
                            }

                            // Clean up partImage: prevent /Assets/Assets/ double prefix
                            if (!string.IsNullOrEmpty(partImage))
                            {
                                if (partImage.StartsWith("Assets/", StringComparison.OrdinalIgnoreCase))
                                    partImage = "/" + partImage;
                                else if (!partImage.StartsWith("/") && !partImage.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                                    partImage = "/Assets/" + partImage;
                            }

                            products.Add(new
                            {
                                id = Convert.ToInt32(row["id"]),
                                name = row["part_name"].ToString(),
                                price = Convert.ToDecimal(row["selling_price"]),
                                stock = Convert.ToInt32(row["quantity_in_stock"]),
                                minStock = Convert.ToInt32(row["minimum_stock_level"]),
                                barcode = row["barcode"].ToString(),
                                sku = row["part_number"].ToString(),
                                category = category,
                                image = partImage,
                                categoryImage = catImage,
                                isService = category.Equals("Services", StringComparison.OrdinalIgnoreCase)
                            });
                        }

                        return Microsoft.AspNetCore.Http.Results.Ok(products);
                    }
                    catch (Exception ex)
                    {
                        return Microsoft.AspNetCore.Http.Results.Problem("DB error: " + ex.Message);
                    }
                });

                // - Categories -
                app.MapGet("/api/categories", () =>
                {
                    try
                    {
                        var dt = DatabaseHelper.ExecuteDataTable("SELECT category_name FROM categories ORDER BY category_name");
                        var categories = new System.Collections.Generic.List<string>();
                        foreach (System.Data.DataRow row in dt.Rows)
                            categories.Add(row["category_name"].ToString());

                        return Microsoft.AspNetCore.Http.Results.Ok(categories);
                    }
                    catch (Exception ex)
                    {
                        return Microsoft.AspNetCore.Http.Results.Problem("DB error: " + ex.Message);
                    }
                });

                // - Login (POST) -
                app.MapPost("/api/login", async (Microsoft.AspNetCore.Http.HttpRequest request) =>
                {
                    try
                    {
                        var body = await System.Text.Json.JsonSerializer.DeserializeAsync<LoginPayload>(
                            request.Body,
                            new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                        if (body == null || string.IsNullOrEmpty(body.Username) || string.IsNullOrEmpty(body.Password))
                            return Microsoft.AspNetCore.Http.Results.BadRequest("Missing credentials");

                        // Allow Softio super-admin through the web POS too
                        if (body.Username == "Softio.Admin" && body.Password == "Softio@2026!")
                            return Microsoft.AspNetCore.Http.Results.Ok(new { username = "Softio.Admin", role = "Admin", fullName = "Softio Super Admin" });

                        var dt = DatabaseHelper.ExecuteDataTable(
                            "SELECT username, role, full_name FROM users WHERE username = @u AND password = @p",
                            new Microsoft.Data.Sqlite.SqliteParameter("@u", body.Username),
                            new Microsoft.Data.Sqlite.SqliteParameter("@p", body.Password));

                        if (dt.Rows.Count == 0)
                            return Microsoft.AspNetCore.Http.Results.Unauthorized();

                        var row = dt.Rows[0];
                        return Microsoft.AspNetCore.Http.Results.Ok(new
                        {
                            username = row["username"].ToString(),
                            role = row["role"].ToString(),
                            fullName = row["full_name"].ToString()
                        });
                    }
                    catch (Exception ex)
                    {
                        return Microsoft.AspNetCore.Http.Results.Problem("Login error: " + ex.Message);
                    }
                });

                // - Add Item (POST) -
                app.MapPost("/api/add-item", async (Microsoft.AspNetCore.Http.HttpRequest request) =>
                {
                    try
                    {
                        var body = await System.Text.Json.JsonSerializer.DeserializeAsync<AddItemPayload>(
                            request.Body,
                            new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                        if (body == null || string.IsNullOrEmpty(body.Name))
                            return Microsoft.AspNetCore.Http.Results.BadRequest("Missing name");

                        if (!string.IsNullOrEmpty(body.Barcode))
                        {
                            int existingCount = DatabaseHelper.ExecuteScalar<int>(
                                "SELECT COUNT(*) FROM parts WHERE barcode = @b AND date_deleted IS NULL",
                                new Microsoft.Data.Sqlite.SqliteParameter("@b", body.Barcode));

                            if (existingCount > 0)
                                return Microsoft.AspNetCore.Http.Results.Conflict(new { error = "Barcode already exists for another item." });
                        }

                        int catId = DatabaseHelper.ExecuteScalar<int>("SELECT id FROM categories WHERE category_name = @c",
                                    new Microsoft.Data.Sqlite.SqliteParameter("@c", body.Category ?? "General"));
                        if (catId == 0) catId = 1;

                        string sql = @"
                            INSERT INTO parts (part_name, part_number, category_id, purchase_price, selling_price, quantity_in_stock, barcode, status)
                            VALUES (@name, @sku, @cat, @p_price, @s_price, @stock, @barcode, 'Active')";

                        DatabaseHelper.ExecuteNonQuery(sql,
                            new Microsoft.Data.Sqlite.SqliteParameter("@name", body.Name),
                            new Microsoft.Data.Sqlite.SqliteParameter("@sku", body.Sku ?? ""),
                            new Microsoft.Data.Sqlite.SqliteParameter("@cat", catId),
                            new Microsoft.Data.Sqlite.SqliteParameter("@p_price", body.Price * 0.7m),
                            new Microsoft.Data.Sqlite.SqliteParameter("@s_price", body.Price),
                            new Microsoft.Data.Sqlite.SqliteParameter("@stock", body.Stock),
                            new Microsoft.Data.Sqlite.SqliteParameter("@barcode", body.Barcode ?? ""));

                        DatabaseHelper.LogTransaction("STOCK_ADD", body.Name, $"Added via WebPOS (Qty: {body.Stock})");

                        // - Broadcast real-time update to all connected clients -
                        _ = InventoryBroadcaster.Broadcast("InventoryChanged", $"Item '{body.Name}' added via Web POS");

                        return Microsoft.AspNetCore.Http.Results.Ok(new { success = true });
                    }
                    catch (Exception ex)
                    {
                        return Microsoft.AspNetCore.Http.Results.Problem("Failed to add item: " + ex.Message);
                    }
                });

                // - Checkout (POST) -
                app.MapPost("/api/checkout", async (Microsoft.AspNetCore.Http.HttpRequest request) =>
                {
                    try
                    {
                        var body = await System.Text.Json.JsonSerializer.DeserializeAsync<CheckoutPayload>(
                            request.Body,
                            new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                        if (body == null || body.Items == null || body.Items.Count == 0)
                            return Microsoft.AspNetCore.Http.Results.BadRequest("Empty cart");

                        decimal total = 0;
                        foreach (var item in body.Items) total += item.Price * item.Qty;

                        // SQLite: insert order then get its rowid separately
                        DatabaseHelper.ExecuteNonQuery(
                            "INSERT INTO orders (order_date, customer_id, total_amount, status, payment_status, payment_method) " +
                            "VALUES (datetime('now'), NULL, @total, 'Completed', 'Paid', 'WebPOS')",
                            new Microsoft.Data.Sqlite.SqliteParameter("@total", total));
                        long orderId = DatabaseHelper.ExecuteScalar<long>("SELECT last_insert_rowid()");

                        foreach (var item in body.Items)
                        {
                            if (item.Id > 0)
                            {
                                DatabaseHelper.ExecuteNonQuery(
                                    "INSERT INTO order_items (order_id, part_id, quantity, price) VALUES (@oid, @pid, @qty, @price)",
                                    new Microsoft.Data.Sqlite.SqliteParameter("@oid", orderId),
                                    new Microsoft.Data.Sqlite.SqliteParameter("@pid", item.Id),
                                    new Microsoft.Data.Sqlite.SqliteParameter("@qty", item.Qty),
                                    new Microsoft.Data.Sqlite.SqliteParameter("@price", item.Price));

                                DatabaseHelper.ExecuteNonQuery(
                                    "UPDATE parts SET quantity_in_stock = quantity_in_stock - @qty WHERE id = @pid",
                                    new Microsoft.Data.Sqlite.SqliteParameter("@qty", item.Qty),
                                    new Microsoft.Data.Sqlite.SqliteParameter("@pid", item.Id));
                            }
                        }

                        DatabaseHelper.ExecuteNonQuery(
                            "INSERT INTO transactions (action_type, part_name, description, username) VALUES ('SALE', 'POS Sale', @desc, 'WebPOS')",
                            new Microsoft.Data.Sqlite.SqliteParameter("@desc", $"Order #{orderId} -- Total: {total:C}"));

                        // - Broadcast real-time update to ALL connected clients -
                        _ = InventoryBroadcaster.Broadcast("SaleCompleted", $"Order #{orderId} - Total: {total:F2}");

                        return Microsoft.AspNetCore.Http.Results.Ok(new { success = true, orderId, total });
                    }
                    catch (Exception ex)
                    {
                        return Microsoft.AspNetCore.Http.Results.Problem("Checkout failed: " + ex.Message);
                    }
                });

                // - Currencies (GET) -
                app.MapGet("/api/currencies", () =>
                {
                    try
                    {
                        var dt = DatabaseHelper.ExecuteDataTable("SELECT code, name, symbol, rate_vs_usd FROM currency_rates ORDER BY code");
                        var currencies = new System.Collections.Generic.List<object>();
                        foreach (System.Data.DataRow row in dt.Rows)
                        {
                            currencies.Add(new
                            {
                                code = row["code"].ToString(),
                                name = row["name"].ToString(),
                                symbol = row["symbol"].ToString(),
                                rate = Convert.ToDecimal(row["rate_vs_usd"])
                            });
                        }
                        return Microsoft.AspNetCore.Http.Results.Ok(currencies);
                    }
                    catch (Exception ex) { return Microsoft.AspNetCore.Http.Results.Problem(ex.Message); }
                });

                // - Recent Sales (GET) -
                app.MapGet("/api/recent-sales", () =>
                {
                    try
                    {
                        var dt = DatabaseHelper.ExecuteDataTable(
                            @"SELECT o.order_id, o.order_date, o.total_amount, 
                                     COALESCE(c.full_name, 'Cash Customer') as customer_name
                              FROM orders o
                              LEFT JOIN customers c ON o.customer_id = c.customer_id
                              WHERE o.status != 'Cancelled'
                              ORDER BY o.order_id DESC LIMIT 50");

                        var sales = new System.Collections.Generic.List<object>();
                        foreach (System.Data.DataRow row in dt.Rows)
                        {
                            sales.Add(new
                            {
                                orderId = Convert.ToInt32(row["order_id"]),
                                date = Convert.ToDateTime(row["order_date"]),
                                total = Convert.ToDecimal(row["total_amount"]),
                                customer = row["customer_name"].ToString()
                            });
                        }
                        return Microsoft.AspNetCore.Http.Results.Ok(sales);
                    }
                    catch (Exception ex) { return Microsoft.AspNetCore.Http.Results.Problem(ex.Message); }
                });

                // - Order Details (GET) -
                app.MapGet("/api/order-details/{id}", (int id) =>
                {
                    try
                    {
                        var dt = DatabaseHelper.ExecuteDataTable(
                            @"SELECT oi.part_id, p.part_name, oi.quantity, oi.price
                              FROM order_items oi
                              JOIN parts p ON oi.part_id = p.id
                              WHERE oi.order_id = @id",
                            new Microsoft.Data.Sqlite.SqliteParameter("@id", id));

                        var items = new System.Collections.Generic.List<object>();
                        foreach (System.Data.DataRow row in dt.Rows)
                        {
                            items.Add(new
                            {
                                partId = Convert.ToInt32(row["part_id"]),
                                name = row["part_name"].ToString(),
                                qty = Convert.ToInt32(row["quantity"]),
                                price = Convert.ToDecimal(row["price"])
                            });
                        }
                        return Microsoft.AspNetCore.Http.Results.Ok(items);
                    }
                    catch (Exception ex) { return Microsoft.AspNetCore.Http.Results.Problem(ex.Message); }
                });

                // - Return Item (POST) -
                app.MapPost("/api/return-item", async (Microsoft.AspNetCore.Http.HttpRequest request) =>
                {
                    try
                    {
                        var body = await System.Text.Json.JsonSerializer.DeserializeAsync<ReturnPayload>(
                            request.Body,
                            new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                        if (body == null || body.Items == null || body.Items.Count == 0)
                            return Microsoft.AspNetCore.Http.Results.BadRequest("No items to return");

                        var returnService = new ReturnService();
                        var items = new System.Collections.Generic.List<ReturnItemInfo>();
                        foreach (var i in body.Items)
                        {
                            items.Add(new ReturnItemInfo
                            {
                                PartId = i.PartId,
                                Quantity = i.Qty,
                                RefundAmount = i.RefundAmount
                            });
                        }

                        // Use a dummy user or extract from context if we have one
                        UserSession.Username = "WebPOS";

                        returnService.ProcessReturn(body.OrderId, items, body.Reason);

                        _ = InventoryBroadcaster.Broadcast("InventoryChanged", $"Return processed for Order #{body.OrderId}");

                        return Microsoft.AspNetCore.Http.Results.Ok(new { success = true });
                    }
                    catch (Exception ex) { return Microsoft.AspNetCore.Http.Results.Problem(ex.Message); }
                });

                // Ports are configured via Kestrel above
                app.Run();
            }
            catch (Exception ex)
            {
                System.IO.File.AppendAllText("server_error.txt", DateTime.Now.ToString() + ": " + ex.ToString() + "\n");
            }
        }


        // Payload models for API
        private class LoginPayload
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        private class AddItemPayload
        {
            public string Name { get; set; }
            public string Category { get; set; }
            public decimal Price { get; set; }
            public int Stock { get; set; }
            public string Barcode { get; set; }
            public string Sku { get; set; }
        }

        private class CheckoutPayload
        {
            public System.Collections.Generic.List<CheckoutItem> Items { get; set; }
        }
        private class CheckoutItem
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public decimal Price { get; set; }
            public int Qty { get; set; }
        }

        private class ReturnPayload
        {
            public int OrderId { get; set; }
            public string Reason { get; set; }
            public System.Collections.Generic.List<ReturnItemDetail> Items { get; set; }
        }
        private class ReturnItemDetail
        {
            public int PartId { get; set; }
            public int Qty { get; set; }
            public decimal RefundAmount { get; set; }
        }
    }
}

// ============================================================
//  SignalR Hub -- manages real-time WebSocket connections
// ============================================================
namespace InventorySystem
{
    using Microsoft.AspNetCore.SignalR;

    /// <summary>
    /// SignalR Hub for real-time inventory synchronization.
    /// Connected clients (web POS tablets and WinForms app) receive
    /// live push events whenever stock or sales data changes.
    /// </summary>
    public class InventoryHub : Hub
    {
        /// <summary>Called by any client to trigger a refresh on all others.</summary>
        public async Task RequestRefresh(string reason = "manual")
        {
            await Clients.Others.SendAsync("StockUpdated", reason);
        }
    }

    /// <summary>
    /// Static broadcaster: lets WinForms code push events to ALL
    /// connected web clients (tablets) with a single line of code.
    /// Usage: _ = InventoryBroadcaster.Broadcast("SaleCompleted", "Order #42");
    /// </summary>
    public static class InventoryBroadcaster
    {
        public static IHubContext<InventoryHub> HubContext { get; set; }

        /// <summary>
        /// Broadcasts a named event + message to every connected SignalR client.
        /// Safe to call fire-and-forget: _ = InventoryBroadcaster.Broadcast(...)
        /// </summary>
        public static async System.Threading.Tasks.Task Broadcast(string eventName, string message = "")
        {
            try
            {
                if (HubContext != null)
                    await HubContext.Clients.All.SendAsync(eventName, message);
            }
            catch { /* Never crash the caller due to broadcast failure */ }
        }

        /// <summary>Convenience: broadcast a generic stock-changed event.</summary>
        public static void BroadcastStockChange(string reason = "desktop")
        {
            _ = Broadcast("StockUpdated", reason);
        }
    }
}

