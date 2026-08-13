using System;
using System.Runtime.InteropServices;
using System.IO;
using System.Text;

namespace InventorySystem.Helpers
{
    /// <summary>
    /// Sends raw bytes to a Windows printer.
    /// Prefers direct port I/O (USB001) so the Xprinter driver cannot strip TSPL graphics in label mode.
    /// Falls back to winspool WritePrinter(RAW).
    /// </summary>
    internal static class RawPrinterHelper
    {
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private class DOCINFOW
        {
            [MarshalAs(UnmanagedType.LPWStr)] public string pDocName;
            [MarshalAs(UnmanagedType.LPWStr)] public string pOutputFile;
            [MarshalAs(UnmanagedType.LPWStr)] public string pDataType;
        }

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private struct PRINTER_DEFAULTS
        {
            public IntPtr pDatatype;
            public IntPtr pDevMode;
            public int DesiredAccess;
        }

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private struct PRINTER_INFO_2
        {
            public string pServerName;
            public string pPrinterName;
            public string pShareName;
            public string pPortName;
            public string pDriverName;
            public string pComment;
            public string pLocation;
            public IntPtr pDevMode;
            public string pSepFile;
            public string pPrintProcessor;
            public string pDatatype;
            public string pParameters;
            public IntPtr pSecurityDescriptor;
            public uint Attributes;
            public uint Priority;
            public uint DefaultPriority;
            public uint StartTime;
            public uint UntilTime;
            public uint Status;
            public uint cJobs;
            public uint AveragePPM;
        }

        [DllImport("winspool.Drv", EntryPoint = "OpenPrinterW", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern bool OpenPrinter(string src, out IntPtr hPrinter, IntPtr pd);

        [DllImport("winspool.Drv", EntryPoint = "ClosePrinter", SetLastError = true)]
        private static extern bool ClosePrinter(IntPtr hPrinter);

        [DllImport("winspool.Drv", EntryPoint = "StartDocPrinterW", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern bool StartDocPrinter(IntPtr hPrinter, int level, [In] DOCINFOW di);

        [DllImport("winspool.Drv", EntryPoint = "EndDocPrinter", SetLastError = true)]
        private static extern bool EndDocPrinter(IntPtr hPrinter);

        [DllImport("winspool.Drv", EntryPoint = "StartPagePrinter", SetLastError = true)]
        private static extern bool StartPagePrinter(IntPtr hPrinter);

        [DllImport("winspool.Drv", EntryPoint = "EndPagePrinter", SetLastError = true)]
        private static extern bool EndPagePrinter(IntPtr hPrinter);

        [DllImport("winspool.Drv", EntryPoint = "WritePrinter", SetLastError = true)]
        private static extern bool WritePrinter(IntPtr hPrinter, IntPtr pBytes, int dwCount, out int dwWritten);

        [DllImport("winspool.Drv", EntryPoint = "GetPrinterW", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern bool GetPrinter(IntPtr hPrinter, int level, IntPtr pPrinter, int cbBuf, out int pcbNeeded);

        public static void SendBytes(string printerName, byte[] data, string docName = "Panache Raw")
        {
            if (string.IsNullOrWhiteSpace(printerName))
                throw new InvalidOperationException("No printer selected for raw print.");
            if (data == null || data.Length == 0)
                throw new InvalidOperationException("Nothing to print.");

            // Spooler RAW first — same path that successfully prints receipts (ESC/POS).
            // Direct \\.\USB001 often "succeeds" while the device only accepts driver/spooler data,
            // which produced blank label feeds.
            try
            {
                SendViaSpooler(printerName.Trim(), data, docName);
                return;
            }
            catch
            {
                // Fall through to port I/O
            }

            string port = null;
            try { port = GetPrinterPort(printerName.Trim()); } catch { }
            if (!string.IsNullOrWhiteSpace(port) && TryWritePort(port, data))
                return;

            throw new InvalidOperationException("Could not send raw data to printer: " + printerName);
        }

        private static bool TryWritePort(string portName, byte[] data)
        {
            // e.g. USB001, COM3 — skip file/network ports
            string p = portName.Trim();
            if (p.EndsWith(":", StringComparison.Ordinal))
                p = p.TrimEnd(':');
            string upper = p.ToUpperInvariant();
            if (!(upper.StartsWith("USB") || upper.StartsWith("COM") || upper.StartsWith("LPT")))
                return false;

            string path = @"\\.\" + p;
            using var fs = new FileStream(path, FileMode.Open, FileAccess.Write, FileShare.ReadWrite);
            fs.Write(data, 0, data.Length);
            fs.Flush();
            return true;
        }

        private static string GetPrinterPort(string printerName)
        {
            if (!OpenPrinter(printerName, out IntPtr hPrinter, IntPtr.Zero))
                return null;
            try
            {
                GetPrinter(hPrinter, 2, IntPtr.Zero, 0, out int needed);
                if (needed <= 0) return null;
                IntPtr buf = Marshal.AllocHGlobal(needed);
                try
                {
                    if (!GetPrinter(hPrinter, 2, buf, needed, out _))
                        return null;
                    var info = Marshal.PtrToStructure<PRINTER_INFO_2>(buf);
                    return info.pPortName;
                }
                finally
                {
                    Marshal.FreeHGlobal(buf);
                }
            }
            finally
            {
                ClosePrinter(hPrinter);
            }
        }

        private static void SendViaSpooler(string printerName, byte[] data, string docName)
        {
            if (!OpenPrinter(printerName, out IntPtr hPrinter, IntPtr.Zero))
                throw new InvalidOperationException("Could not open printer: " + printerName);

            IntPtr pUnmanaged = IntPtr.Zero;
            try
            {
                var di = new DOCINFOW
                {
                    pDocName = docName,
                    pOutputFile = null,
                    pDataType = "RAW"
                };

                if (!StartDocPrinter(hPrinter, 1, di))
                    throw new InvalidOperationException("StartDocPrinter failed (is RAW supported on this driver?).");

                try
                {
                    if (!StartPagePrinter(hPrinter))
                        throw new InvalidOperationException("StartPagePrinter failed.");

                    try
                    {
                        pUnmanaged = Marshal.AllocCoTaskMem(data.Length);
                        Marshal.Copy(data, 0, pUnmanaged, data.Length);
                        if (!WritePrinter(hPrinter, pUnmanaged, data.Length, out int written) || written != data.Length)
                            throw new InvalidOperationException("WritePrinter failed or wrote incomplete data.");
                    }
                    finally
                    {
                        EndPagePrinter(hPrinter);
                    }
                }
                finally
                {
                    EndDocPrinter(hPrinter);
                }
            }
            finally
            {
                if (pUnmanaged != IntPtr.Zero)
                    Marshal.FreeCoTaskMem(pUnmanaged);
                ClosePrinter(hPrinter);
            }
        }
    }
}
