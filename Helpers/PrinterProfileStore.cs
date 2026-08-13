using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace InventorySystem.Helpers
{
    /// <summary>
    /// Per-printer print mode + label size. Auto uses name heuristics;
    /// explicit GDI keeps unknown/other printers on the safe Windows path.
    /// </summary>
    public enum PrintProtocol
    {
        Auto = 0,
        EscPos = 1,
        Tspl = 2,
        Gdi = 3
    }

    public sealed class PrinterProfile
    {
        public string PrinterName { get; set; } = "";
        /// <summary>auto | escpos | gdi</summary>
        public string ReceiptProtocol { get; set; } = "auto";
        /// <summary>auto | tspl | gdi</summary>
        public string LabelProtocol { get; set; } = "auto";
        public double LabelWidthMm { get; set; } = TsplRawPrint.DefaultWidthMm;
        public double LabelHeightMm { get; set; } = TsplRawPrint.DefaultHeightMm;
        public double LabelGapMm { get; set; } = TsplRawPrint.DefaultGapMm;
    }

    public static class PrinterProfileStore
    {
        private static readonly object Gate = new object();
        private static Dictionary<string, PrinterProfile> _cache;

        private static string FilePath =>
            Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "printer_profiles.json");

        public static PrintProtocol ParseProtocol(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return PrintProtocol.Auto;
            switch (value.Trim().ToLowerInvariant())
            {
                case "escpos":
                case "esc/pos":
                case "esc-pos":
                    return PrintProtocol.EscPos;
                case "tspl":
                case "label":
                    return PrintProtocol.Tspl;
                case "gdi":
                case "windows":
                case "system":
                    return PrintProtocol.Gdi;
                default:
                    return PrintProtocol.Auto;
            }
        }

        public static string ProtocolKey(PrintProtocol p) => p switch
        {
            PrintProtocol.EscPos => "escpos",
            PrintProtocol.Tspl => "tspl",
            PrintProtocol.Gdi => "gdi",
            _ => "auto"
        };

        public static PrinterProfile Get(string printerName)
        {
            string key = NormalizeKey(printerName);
            EnsureLoaded();
            lock (Gate)
            {
                if (!string.IsNullOrEmpty(key) && _cache.TryGetValue(key, out var p) && p != null)
                    return Clone(p);
            }
            return new PrinterProfile
            {
                PrinterName = printerName?.Trim() ?? "",
                LabelWidthMm = TsplRawPrint.DefaultWidthMm,
                LabelHeightMm = TsplRawPrint.DefaultHeightMm,
                LabelGapMm = TsplRawPrint.DefaultGapMm
            };
        }

        /// <summary>Remember last UI choice for this printer (partial update).</summary>
        public static void Remember(
            string printerName,
            string receiptProtocol = null,
            string labelProtocol = null,
            double? labelWidthMm = null,
            double? labelHeightMm = null,
            double? labelGapMm = null)
        {
            string name = (printerName ?? "").Trim();
            if (string.IsNullOrEmpty(name)) return;

            EnsureLoaded();
            lock (Gate)
            {
                string key = NormalizeKey(name);
                if (!_cache.TryGetValue(key, out var p) || p == null)
                {
                    p = new PrinterProfile { PrinterName = name };
                    _cache[key] = p;
                }

                p.PrinterName = name;
                if (!string.IsNullOrWhiteSpace(receiptProtocol))
                    p.ReceiptProtocol = ProtocolKey(ParseProtocol(receiptProtocol));
                if (!string.IsNullOrWhiteSpace(labelProtocol))
                    p.LabelProtocol = ProtocolKey(ParseProtocol(labelProtocol));
                if (labelWidthMm.HasValue && labelWidthMm.Value >= 20 && labelWidthMm.Value <= 120)
                    p.LabelWidthMm = labelWidthMm.Value;
                if (labelHeightMm.HasValue && labelHeightMm.Value >= 15 && labelHeightMm.Value <= 120)
                    p.LabelHeightMm = labelHeightMm.Value;
                if (labelGapMm.HasValue && labelGapMm.Value >= 0 && labelGapMm.Value <= 20)
                    p.LabelGapMm = labelGapMm.Value;

                SaveUnlocked();
            }
        }

        public static PrintProtocol ResolveReceiptProtocol(string printerName, string overrideProtocol = null)
        {
            var forced = ParseProtocol(overrideProtocol);
            if (forced != PrintProtocol.Auto)
                return forced == PrintProtocol.Tspl ? PrintProtocol.Gdi : forced;

            var profile = Get(printerName);
            forced = ParseProtocol(profile.ReceiptProtocol);
            if (forced != PrintProtocol.Auto)
                return forced == PrintProtocol.Tspl ? PrintProtocol.Gdi : forced;

            // Auto: known ESC/POS or raw-TSPL names only — never force raw on unknown printers
            if (EscPosRawPrint.PrefersEscPos(printerName))
                return PrintProtocol.EscPos;
            if (TsplRawPrint.PrefersRawTspl(printerName))
                return PrintProtocol.Tspl;
            return PrintProtocol.Gdi;
        }

        public static PrintProtocol ResolveLabelProtocol(string printerName, string overrideProtocol = null)
        {
            var forced = ParseProtocol(overrideProtocol);
            if (forced != PrintProtocol.Auto)
                return forced == PrintProtocol.EscPos ? PrintProtocol.Gdi : forced;

            var profile = Get(printerName);
            forced = ParseProtocol(profile.LabelProtocol);
            if (forced != PrintProtocol.Auto)
                return forced == PrintProtocol.EscPos ? PrintProtocol.Gdi : forced;

            if (TsplRawPrint.PrefersLabelTspl(printerName))
                return PrintProtocol.Tspl;
            return PrintProtocol.Gdi;
        }

        private static string NormalizeKey(string printerName) =>
            (printerName ?? "").Trim().ToLowerInvariant();

        private static PrinterProfile Clone(PrinterProfile p) => new PrinterProfile
        {
            PrinterName = p.PrinterName,
            ReceiptProtocol = p.ReceiptProtocol,
            LabelProtocol = p.LabelProtocol,
            LabelWidthMm = p.LabelWidthMm,
            LabelHeightMm = p.LabelHeightMm,
            LabelGapMm = p.LabelGapMm
        };

        private static void EnsureLoaded()
        {
            lock (Gate)
            {
                if (_cache != null) return;
                _cache = new Dictionary<string, PrinterProfile>(StringComparer.OrdinalIgnoreCase);
                try
                {
                    if (!File.Exists(FilePath)) return;
                    string json = File.ReadAllText(FilePath);
                    var list = JsonSerializer.Deserialize<List<PrinterProfile>>(json);
                    if (list == null) return;
                    foreach (var p in list.Where(x => x != null && !string.IsNullOrWhiteSpace(x.PrinterName)))
                        _cache[NormalizeKey(p.PrinterName)] = p;
                }
                catch
                {
                    _cache = new Dictionary<string, PrinterProfile>(StringComparer.OrdinalIgnoreCase);
                }
            }
        }

        private static void SaveUnlocked()
        {
            try
            {
                var list = _cache.Values
                    .Where(p => p != null && !string.IsNullOrWhiteSpace(p.PrinterName))
                    .OrderBy(p => p.PrinterName, StringComparer.OrdinalIgnoreCase)
                    .ToList();
                var json = JsonSerializer.Serialize(list, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(FilePath, json);
            }
            catch { /* non-fatal */ }
        }
    }
}
