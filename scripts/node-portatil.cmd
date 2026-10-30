@echo off
rem Descarrega o Node.js 24 LTS oficial (nodejs.org) para %LOCALAPPDATA%\muntu-node.
rem Portatil: nao instala nada no sistema e nao mexe no Node que ja tem.
if exist "%LOCALAPPDATA%\muntu-node\node.exe" exit /b 0
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$base='https://nodejs.org/dist/latest-v24.x/';" ^
  "$sums=(Invoke-WebRequest -UseBasicParsing ($base+'SHASUMS256.txt')).Content;" ^
  "$line=($sums -split [char]10 | Where-Object { $_ -match 'node-v[0-9.]+-win-x64\.zip$' } | Select-Object -First 1).Trim();" ^
  "$hash,$name=$line -split '\s+';" ^
  "$zip=Join-Path $env:TEMP $name;" ^
  "Write-Host ('A descarregar '+$name);" ^
  "Invoke-WebRequest -UseBasicParsing ($base+$name) -OutFile $zip;" ^
  "if ((Get-FileHash $zip -Algorithm SHA256).Hash.ToLower() -ne $hash.ToLower()) { throw 'SHA256 nao confere' };" ^
  "$dst=Join-Path $env:LOCALAPPDATA 'muntu-node-tmp'; if (Test-Path $dst) { Remove-Item $dst -Recurse -Force };" ^
  "Expand-Archive $zip -DestinationPath $dst;" ^
  "$inner=Get-ChildItem $dst | Select-Object -First 1;" ^
  "Move-Item $inner.FullName (Join-Path $env:LOCALAPPDATA 'muntu-node');" ^
  "Remove-Item $dst -Recurse -Force; Remove-Item $zip -Force;" ^
  "Write-Host 'Node portatil pronto.'"
exit /b %errorlevel%
