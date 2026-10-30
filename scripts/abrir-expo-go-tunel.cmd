@echo off
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
title MUNTU - Expo Go (tunel)
cd /d "%~dp0..\apps\ios-android"
echo.
echo  Modo tunel: funciona mesmo que o telemovel esteja noutra rede.
echo.
call npx expo start --go --tunnel
pause
