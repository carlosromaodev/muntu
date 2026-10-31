@echo off
setlocal EnableExtensions
title MUNTU - API (backend)
rem Arranca a API em http://localhost:3000/v1 com o PostgreSQL embutido
rem (dados em backend\.data). Para PostgreSQL real, defina DATABASE_URL.
cd /d "%~dp0..\backend"
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
if not exist node_modules (
  echo  Primeiro corra scripts\backend-instalar.cmd
  pause
  exit /b 1
)
call npm run build
if errorlevel 1 (
  pause
  exit /b 1
)
echo.
echo  API: http://localhost:3000/v1/saude
echo  Fechar esta janela para parar.
echo.
node dist/src/main.js
pause
