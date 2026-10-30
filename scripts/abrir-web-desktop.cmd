@echo off
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
title MUNTU - web desktop
cd /d "%~dp0..\apps\web-desktop"
echo.
echo  A abrir o MUNTU desktop em http://localhost:8081
echo.
call npx expo start --web --port 8081
pause
