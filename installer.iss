[Setup]
; App Information
AppName=OtargiInventorySystem
AppVersion=1.0
AppPublisher=Softio
AppPublisherURL=https://softio.com
AppSupportURL=https://softio.com
AppUpdatesURL=https://softio.com

; Default installation folder
DefaultDirName={autopf}\OtargiInventorySystem
DefaultGroupName=OtargiInventorySystem

; Output settings
OutputDir=.\InstallerOutput
OutputBaseFilename=OtargiInventorySystem_Setup_v1.0

; Compression
Compression=lzma
SolidCompression=yes

; Require admin rights to install to Program Files
PrivilegesRequired=admin

; Setup Icon (Optional - will use default if not specified)
SetupIconFile=Assets\icon.ico

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
; Main executable
Source: "publish-output\OtargiInventorySystem.exe"; DestDir: "{app}"; Flags: ignoreversion

; Configuration file
Source: "publish-output\appsettings.json"; DestDir: "{app}"; Flags: ignoreversion

; Folders
Source: "publish-output\Assets\*"; DestDir: "{app}\Assets"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "publish-output\wwwroot\*"; DestDir: "{app}\wwwroot"; Flags: ignoreversion recursesubdirs createallsubdirs

; Catch any other files in publish-output (like sqlite dlls if any exist outside single-file)
Source: "publish-output\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: "OtargiInventorySystem.exe,appsettings.json,Assets,wwwroot,Plugins"

[Dirs]
Name: "{app}"; Permissions: users-modify
Name: "{app}\Plugins"; Permissions: users-modify

[Icons]
; Start Menu Icon
Name: "{group}\OtargiInventorySystem"; Filename: "{app}\OtargiInventorySystem.exe"; IconFilename: "{app}\Assets\icon.ico"
; Desktop Icon
Name: "{autodesktop}\OtargiInventorySystem"; Filename: "{app}\OtargiInventorySystem.exe"; IconFilename: "{app}\Assets\icon.ico"; Tasks: desktopicon

[Run]
; Launch application after installation
Filename: "{app}\OtargiInventorySystem.exe"; Description: "{cm:LaunchProgram,OtargiInventorySystem}"; Flags: nowait postinstall skipifsilent
