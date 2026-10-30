@echo off
setlocal EnableExtensions
title MUNTU - instalar e verificar
rem ---------------------------------------------------------------------------
rem  Instala o MUNTU do zero (Expo SDK 58) e verifica que todas as plataformas
rem  compilam: web desktop, web mobile, Android e iOS.
rem  Registo completo em scripts\instalar.log
rem ---------------------------------------------------------------------------
cd /d "%~dp0.."
set "ROOT=%CD%"
set "LOG=%ROOT%\scripts\instalar.log"
echo MUNTU - instalacao %date% %time% > "%LOG%"

call :passo "1/7  Verificar o Node.js"
where node >> "%LOG%" 2>&1
node -v >> "%LOG%" 2>&1
call :nodeok
if not errorlevel 1 goto nodepronto
call :log "Node instalado nao e suportado pelo Expo SDK 58 (precisa de 22.13+, 24.3+ ou 26+)."
call :log "A usar um Node 24 LTS portatil so para o MUNTU (nao altera o Node do sistema)."
call "%ROOT%\scripts\node-portatil.cmd" >> "%LOG%" 2>&1
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
call :nodeok
if errorlevel 1 goto semnode
:nodepronto
for /f %%v in ('node -v') do call :log "Node %%v OK"
for /f %%v in ('npm -v') do call :log "npm %%v"
goto limpar

:semnode
call :log "ERRO: nao foi possivel preparar um Node suportado. Instale o Node.js LTS em https://nodejs.org e volte a correr este ficheiro."
echo.
echo  Instale o Node.js LTS em https://nodejs.org e volte a abrir este ficheiro.
pause
exit /b 1

:limpar
call :passo "2/7  Limpar a instalacao anterior"
if exist ".chk" rmdir /s /q ".chk"
if exist "scripts\verificar.log" del /q "scripts\verificar.log"
if exist ".sync" rmdir /s /q ".sync"
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /q "package-lock.json"
if exist "tsconfig.json" del /q "tsconfig.json"
if exist ".expo" rmdir /s /q ".expo"
for %%a in (ios-android web-desktop web-mobile) do (
  if exist "apps\%%a\node_modules" rmdir /s /q "apps\%%a\node_modules"
  if exist "apps\%%a\.expo" rmdir /s /q "apps\%%a\.expo"
  if exist "apps\%%a\dist" rmdir /s /q "apps\%%a\dist"
  if exist "apps\%%a\dist-android" rmdir /s /q "apps\%%a\dist-android"
  if exist "apps\%%a\dist-ios" rmdir /s /q "apps\%%a\dist-ios"
)
call :log "limpo"

call :passo "3/7  npm install (pode demorar alguns minutos)"
call npm install --no-audit --no-fund >> "%LOG%" 2>&1
call :fim "npm install" || goto falhou

call :passo "4/7  expo-doctor"
pushd apps\ios-android
call npx --yes expo-doctor@latest >> "%LOG%" 2>&1
call :log "EXIT expo-doctor %errorlevel%  (avisos nao bloqueiam)"
popd

call :passo "5/7  Compilar web desktop e web mobile"
call npm run build --workspace @muntu/web-desktop >> "%LOG%" 2>&1
call :fim "build web-desktop" || goto falhou
call npm run build --workspace @muntu/web-mobile >> "%LOG%" 2>&1
call :fim "build web-mobile" || goto falhou

call :passo "6/7  Compilar Android e iOS"
call npm exec --workspace @muntu/ios-android -- expo export --platform android --output-dir dist-android >> "%LOG%" 2>&1
call :fim "export android" || goto falhou
call npm exec --workspace @muntu/ios-android -- expo export --platform ios --output-dir dist-ios >> "%LOG%" 2>&1
call :fim "export ios" || goto falhou

call :passo "7/7  Copia Linux das dependencias (para os testes automaticos do Claude)"
set "LX=%TEMP%\muntu-linux"
if exist "%LX%" rmdir /s /q "%LX%"
mkdir "%LX%\apps\ios-android" "%LX%\apps\web-desktop" "%LX%\apps\web-mobile" "%LX%\packages\shared" "%ROOT%\.sync"
copy /y package.json "%LX%\" >nul
copy /y package-lock.json "%LX%\" >nul
for %%a in (ios-android web-desktop web-mobile) do copy /y "apps\%%a\package.json" "%LX%\apps\%%a\" >nul
copy /y "packages\shared\package.json" "%LX%\packages\shared\" >nul
pushd "%LX%"
call npm ci --os=linux --cpu=x64 --libc=glibc --ignore-scripts --no-audit --no-fund >> "%LOG%" 2>&1
call :fim "npm ci linux"
tar -czf "%ROOT%\.sync\node_modules-linux.tgz" --exclude=node_modules/@muntu node_modules >> "%LOG%" 2>&1
call :fim "tar linux"
popd
rmdir /s /q "%LX%"

call :log "=== TUDO OK ==="
echo.
echo  ============================================================
echo   Instalacao concluida sem erros.
echo   - Telemovel (Expo Go):  scripts\abrir-expo-go.cmd
echo   - Web desktop:          scripts\abrir-web-desktop.cmd
echo   - Web mobile:           scripts\abrir-web-mobile.cmd
echo  ============================================================
timeout /t 20
exit /b 0

:falhou
call :log "=== FALHOU === (ver detalhes acima)"
echo.
echo  Houve um erro. Os detalhes estao em scripts\instalar.log
pause
exit /b 1

rem ---------------------------------------------------------------- funcoes
:nodeok
node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit((a===22&&b>=13)||(a===24&&b>=3)||a>=26?0:1)" >nul 2>&1
exit /b %errorlevel%

:passo
echo.
echo  %~1
echo. >> "%LOG%"
echo === %~1 === >> "%LOG%"
exit /b 0

:log
echo  %~1
echo %~1 >> "%LOG%"
exit /b 0

:fim
set "RC=%errorlevel%"
echo EXIT %~1 %RC% >> "%LOG%"
if not "%RC%"=="0" (
  echo  ERRO em %~1
  exit /b 1
)
echo  OK  %~1
exit /b 0
