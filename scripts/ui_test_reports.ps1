# UI automation: login and exercise Reports form
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type -AssemblyName System.Windows.Forms

$exe = (Resolve-Path (Join-Path $PSScriptRoot "..\bin\Debug\net8.0-windows\win-x64\PanacheInventorySystem.exe")).Path
Get-Process -Name "PanacheInventorySystem" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1
$proc = Start-Process -FilePath $exe -PassThru
Start-Sleep -Seconds 5

Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class NativeMouse {
  [DllImport("user32.dll")] public static extern void mouse_event(int f, int dx, int dy, int d, int e);
  public static void Click() { mouse_event(0x0002,0,0,0,0); mouse_event(0x0004,0,0,0,0); }
}
"@

function Get-ProcessWindow([int]$processId) {
    $root = [System.Windows.Automation.AutomationElement]::RootElement
    $cond = New-Object System.Windows.Automation.PropertyCondition(
        [System.Windows.Automation.AutomationElement]::ProcessIdProperty, $processId)
    return $root.FindFirst([System.Windows.Automation.TreeScope]::Children, $cond)
}

function Find-AllByType($parent, $controlType) {
    $cond = New-Object System.Windows.Automation.PropertyCondition(
        [System.Windows.Automation.AutomationElement]::ControlTypeProperty, $controlType)
    return $parent.FindAll([System.Windows.Automation.TreeScope]::Descendants, $cond)
}

function Invoke-ElementClick($el) {
    if (-not $el) { throw "Element is null" }
    try {
        $inv = $el.GetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern)
        $inv.Invoke()
        return
    } catch {}
    $rect = $el.Current.BoundingRectangle
    $x = [int]($rect.X + $rect.Width / 2)
    $y = [int]($rect.Y + $rect.Height / 2)
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
    Start-Sleep -Milliseconds 100
    [NativeMouse]::Click()
}

function Set-EditValue($el, $text) {
    $el.SetFocus()
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("^a")
    Start-Sleep -Milliseconds 80
    [System.Windows.Forms.SendKeys]::SendWait($text)
}

$win = $null
for ($i = 0; $i -lt 25; $i++) {
    $win = Get-ProcessWindow $proc.Id
    if ($win) { break }
    Start-Sleep -Seconds 1
}
if (-not $win) { throw "Window not found for PID $($proc.Id)" }
Write-Host ("Window: " + $win.Current.Name)

$edits = Find-AllByType $win ([System.Windows.Automation.ControlType]::Edit)
Write-Host ("Edit fields: " + $edits.Count)
if ($edits.Count -ge 2) {
    Set-EditValue $edits[0] "Softio.Admin"
    Start-Sleep -Milliseconds 250
    Set-EditValue $edits[1] "Softio@2026!"
    Start-Sleep -Milliseconds 250
}

$loginBtn = $null
$buttons = Find-AllByType $win ([System.Windows.Automation.ControlType]::Button)
foreach ($b in $buttons) {
    $n = $b.Current.Name
    Write-Host ("BTN: " + $n)
    if ($n -match "LOGIN|Login") { $loginBtn = $b }
}
if ($loginBtn) {
    Write-Host ("Clicking login: " + $loginBtn.Current.Name)
    Invoke-ElementClick $loginBtn
} else {
    Write-Host "Login button not found; sending Enter"
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}

Start-Sleep -Seconds 5
$win = Get-ProcessWindow $proc.Id
Write-Host ("After login window: " + $(if ($win) { $win.Current.Name } else { "null" }))

$reportBtn = $null
if ($win) {
    $buttons = Find-AllByType $win ([System.Windows.Automation.ControlType]::Button)
    foreach ($b in $buttons) {
        $n = $b.Current.Name
        if ($n) { Write-Host ("BTN: " + $n) }
        if ($n -match "Report") { $reportBtn = $b }
    }
}

if ($reportBtn) {
    Write-Host ("Opening Reports: " + $reportBtn.Current.Name)
    Invoke-ElementClick $reportBtn
    Start-Sleep -Seconds 2
} else {
    Write-Host "WARN: Reports nav not found"
}

$win = Get-ProcessWindow $proc.Id
$found = @()
if ($win) {
    $allText = Find-AllByType $win ([System.Windows.Automation.ControlType]::Text)
    foreach ($t in $allText) {
        $n = $t.Current.Name
        if ($n -match "Sales|Profit|Tax|Product|Export|Best|Cost|Total|Report") {
            $found += $n
        }
    }
}
Write-Host "Report-related text:"
$found | Select-Object -Unique | ForEach-Object { Write-Host ("  " + $_) }

$dataGrids = @()
$tables = @()
$combos = @()
$exportBtn = $null
$applyBtn = $null
if ($win) {
    $tables = Find-AllByType $win ([System.Windows.Automation.ControlType]::Table)
    $dataGrids = Find-AllByType $win ([System.Windows.Automation.ControlType]::DataGrid)
    $combos = Find-AllByType $win ([System.Windows.Automation.ControlType]::ComboBox)
    $buttons = Find-AllByType $win ([System.Windows.Automation.ControlType]::Button)
    foreach ($b in $buttons) {
        if ($b.Current.Name -match "Export|Excel") { $exportBtn = $b; Write-Host ("Export button: " + $b.Current.Name) }
        if ($b.Current.Name -match "^Apply$") { $applyBtn = $b }
    }
}
Write-Host ("Tables=" + $tables.Count + " DataGrids=" + $dataGrids.Count + " Combos=" + $combos.Count)

if ($combos.Count -gt 0) {
    $combo = $combos[0]
    try {
        $expand = $combo.GetCurrentPattern([System.Windows.Automation.ExpandCollapsePattern]::Pattern)
        $expand.Expand()
        Start-Sleep -Milliseconds 500
        $items = Find-AllByType $combo ([System.Windows.Automation.ControlType]::ListItem)
        Write-Host ("Period items: " + $items.Count)
        foreach ($it in $items) { Write-Host ("  PERIOD: " + $it.Current.Name) }
        foreach ($it in $items) {
            if ($it.Current.Name -match "Monthly") {
                $sel = $it.GetCurrentPattern([System.Windows.Automation.SelectionItemPattern]::Pattern)
                $sel.Select()
                Write-Host "Selected Monthly"
                break
            }
        }
        Start-Sleep -Seconds 1
    } catch {
        Write-Host ("Combo interact error: " + $_)
    }
}

if ($applyBtn) {
    Write-Host "Click Apply"
    Invoke-ElementClick $applyBtn
    Start-Sleep -Seconds 1
}

Write-Host ("UI automation completed. App PID=" + $proc.Id)
