using System;
using System.Drawing;
using System.Drawing.Printing;
using System.IO;
using System.Linq;

namespace InventorySystem.Helpers
{
    /// <summary>Live printer smoke tests (dev / support).</summary>
    public static class ThermalPrintDiagnostics
    {
        public static string FindXprinterName()
        {
            foreach (string name in PrinterSettings.InstalledPrinters)
            {
                if (name != null && name.IndexOf("xprinter", StringComparison.OrdinalIgnoreCase) >= 0)
                    return name;
                if (name != null && name.IndexOf("365B", StringComparison.OrdinalIgnoreCase) >= 0)
                    return name;
            }
            return null;
        }

        /// <summary>
        /// Disabled — do not send PANACHE TEST slips in production use.
        /// </summary>
        public static string PrintEscPosSmokeTest(string printerName = null)
        {
            throw new InvalidOperationException("ESC/POS smoke test is disabled. Print a normal receipt from the app instead.");
        }
    }
}
