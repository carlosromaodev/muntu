@echo off
setlocal EnableExtensions
title MUNTU - verificar
rem Compila as quatro plataformas com as dependencias ja instaladas (sem reinstalar).
rem Registo em scripts\verificar.log
cd /d "%~dp0.."
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
set "LOG=%CD%\scripts\verificar.log"
echo MUNTU - verificacao %date% %time% > "%LOG%"
for /f %%v in ('node -v') do echo Node %%v >> "%LOG%"
if not exist node_modules (
  echo Dependencias em falta: corra primeiro scripts\instalar.cmd >> "%LOG%"
  echo  Dependencias em falta: corra primeiro scripts\instalar.cmd
  pause
  exit /b 1
)
call :run "web desktop" "npm run build --workspace @muntu/web-desktop" || goto falhou
call :run "web mobile" "npm run build --workspace @muntu/web-mobile" || goto falhou
call :run "android" "npm exec --workspace @muntu/ios-android -- expo export --platform android --output-dir dist-android" || goto falhou
call :run "ios" "npm exec --workspace @muntu/ios-android -- expo export --platform ios --output-dir dist-ios" || goto falhou
echo === TUDO OK === >> "%LOG%"
echo.
echo  Tudo compilou sem erros.
timeout /t 10
exit /b 0
:falhou
echo === FALHOU === >> "%LOG%"
echo  Houve um erro. Veja scripts\verificar.log
pause
exit /b 1
:run
echo.
echo  A compilar %~1...
echo. >> "%LOG%"
echo === %~1 === >> "%LOG%"
call %~2 >> "%LOG%" 2>&1
set "RC=%errorlevel%"
echo EXIT %~1 %RC% >> "%LOG%"
if not "%RC%"=="0" exit /b 1
echo  OK  %~1
exit /b 0
