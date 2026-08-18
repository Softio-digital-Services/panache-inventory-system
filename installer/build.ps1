# Panache Inventory - Release + Installer build
# Usage: powershell -ExecutionPolicy Bypass -File .\installer\build.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$publishDir = Join-Path $root "dist\app"
$distDir = Join-Path $root "dist"
$iss = Join-Path $PSScriptRoot "Panache.iss"
$csproj = Join-Path $root "PanacheInventorySystem.csproj"

Write-Host "==> Publishing self-contained Release (win-x64)..." -ForegroundColor Cyan
if (Test-Path $publishDir) { Remove-Item $publishDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $publishDir | Out-Null

dotnet publish $csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=false -o $publishDir
if ($LASTEXITCODE -ne 0) { throw "dotnet publish failed" }

Write-Host "==> Publishing portable single-file exe..." -ForegroundColor Cyan
$singleDir = Join-Path $root "dist\_single"
$portableExe = Join-Path $distDir "PanacheInventory.exe"
if (Test-Path $singleDir) { Remove-Item $singleDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $distDir | Out-Null
New-Item -ItemType Directory -Force -Path $singleDir | Out-Null
dotnet publish $csproj -c Release -r win-x64 --self-contained true `
    -p:PublishSingleFile=true `
    -p:IncludeNativeLibrariesForSelfExtract=true `
    -p:IncludeAllContentForSelfExtract=true `
    -p:EnableCompressionInSingleFile=true `
    -o $singleDir
if ($LASTEXITCODE -ne 0) { throw "dotnet publish (single-file) failed" }
$publishedExe = Join-Path $singleDir "PanacheInventorySystem.exe"
if (-not (Test-Path $publishedExe)) { throw "Single-file exe not found: $publishedExe" }
Copy-Item $publishedExe $portableExe -Force
Remove-Item $singleDir -Recurse -Force
Write-Host "Portable app: $portableExe" -ForegroundColor Green

Write-Host "==> Looking for Inno Setup 6.4+ (ISCC)..." -ForegroundColor Cyan
$pf86 = ${env:ProgramFiles(x86)}
$pf = $env:ProgramFiles
$lad = $env:LocalAppData
$isccCandidates = @(
    (Join-Path $pf86 "Inno Setup 6\ISCC.exe"),
    (Join-Path $pf "Inno Setup 6\ISCC.exe"),
    (Join-Path $lad "Programs\Inno Setup 6\ISCC.exe"),
    (Join-Path $pf86 "Inno Setup 7\ISCC.exe"),
    (Join-Path $pf "Inno Setup 7\ISCC.exe")
)
$iscc = $isccCandidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1

New-Item -ItemType Directory -Force -Path $distDir | Out-Null

if ($iscc) {
    Write-Host "==> Building PanacheSetup.exe with $iscc" -ForegroundColor Cyan
    Write-Host "    (Setup will auto-install WebView2 on PCs that need it)" -ForegroundColor DarkGray
    & $iscc $iss
    if ($LASTEXITCODE -ne 0) { throw "ISCC failed" }
    $setup = Get-ChildItem $distDir -Filter "PanacheSetup.exe" | Select-Object -First 1
    if ($setup) {
        Write-Host ""
        Write-Host "SUCCESS - give buyers this file:" -ForegroundColor Green
        Write-Host $setup.FullName -ForegroundColor Green
        Write-Host ""
        Write-Host "Target PC needs: Windows 10/11 64-bit. WebView2 is installed by setup if missing." -ForegroundColor Cyan
    }
}
else {
    $zip = Join-Path $distDir "PanacheInventory-Portable.zip"
    if (Test-Path $zip) { Remove-Item $zip -Force }
    Compress-Archive -Path (Join-Path $publishDir "*") -DestinationPath $zip
    Write-Host ""
    Write-Host "Inno Setup not available - created portable zip instead:" -ForegroundColor Yellow
    Write-Host $zip
}

Write-Host ""
Write-Host "Published app folder: $publishDir"
Write-Host "Portable exe: $(Join-Path $distDir 'PanacheInventory.exe')"
Write-Host "Run locally: $(Join-Path $publishDir 'PanacheInventorySystem.exe')"
