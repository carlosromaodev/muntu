@echo off
setlocal EnableExtensions
title MUNTU - instalar backend
rem ---------------------------------------------------------------------------
rem  Instala as dependencias do backend (pasta backend\), compila e corre os
rem  testes. Usa uma base de dados PostgreSQL embutida (PGlite): nao precisa
rem  de instalar o PostgreSQL. Registo em scripts\backend.log
rem ---------------------------------------------------------------------------
cd /d "%~dp0.."
set "ROOT=%CD%"
set "LOG=%ROOT%\scripts\backend.log"
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
echo MUNTU backend - %date% %time% > "%LOG%"
node -v >> "%LOG%" 2>&1
cd backend
echo.
echo  1/3  npm install (pode demorar um ou dois minutos)
echo [npm install] >> "%LOG%"
call npm install --no-audit --no-fund >> "%LOG%" 2>&1
if errorlevel 1 goto falhou
echo  2/3  compilar
echo [build] >> "%LOG%"
call npm run build >> "%LOG%" 2>&1
if errorlevel 1 goto falhou
echo  3/3  testes
echo [test] >> "%LOG%"
call npm test >> "%LOG%" 2>&1
if errorlevel 1 goto falhou
echo [OK] >> "%LOG%"
echo.
echo  Backend instalado e testes a passar. Registo: scripts\backend.log
echo  Para arrancar a API: scripts\backend-arrancar.cmd
timeout /t 8 >nul
exit /b 0
:falhou
echo [FALHOU] >> "%LOG%"
echo.
echo  Algo falhou. Veja scripts\backend.log
timeout /t 8 >nul
exit /b 1
