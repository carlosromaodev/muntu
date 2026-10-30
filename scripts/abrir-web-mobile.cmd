@echo off
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
title MUNTU - web mobile
cd /d "%~dp0..\apps\web-mobile"
echo.
echo  A abrir o MUNTU mobile em http://localhost:8082
echo.
call npx expo start --web --port 8082
pause
