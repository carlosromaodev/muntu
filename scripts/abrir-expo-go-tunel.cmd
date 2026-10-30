@echo off
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
title MUNTU - Expo Go (tunel)
cd /d "%~dp0..\apps\ios-android"
echo.
echo  No iPhone, o Expo Go so abre o projecto com sessao iniciada na mesma conta Expo
echo  aqui no computador e na app Expo Go (conta gratuita em https://expo.dev/signup).
echo.
rem Token pessoal opcional (expo.dev > Account settings > Access tokens) guardado em scripts\expo-token.txt
if exist "%~dp0expo-token.txt" set /p EXPO_TOKEN=<"%~dp0expo-token.txt"
call npx expo whoami >nul 2>&1
if errorlevel 1 (
  echo  Ainda nao tem sessao Expo neste computador.
  echo  Escreva o utilizador ^(ou email^) e a senha da conta Expo. A senha nao aparece ao escrever.
  echo  Se entra no expo.dev com Google ou GitHub e nao tem senha, veja o README ^(token de acesso^).
  echo.
  call npx expo login --no-browser
  if errorlevel 1 (
    echo.
    echo  Nao foi possivel iniciar sessao. Volte a abrir este ficheiro para tentar de novo.
    pause
    exit /b 1
  )
)
for /f "delims=" %%u in ('npx expo whoami 2^>nul') do echo  Sessao Expo: %%u
echo  No iPhone: Expo Go ^> icone da conta (canto superior direito) ^> entre com a MESMA conta.
echo.
echo  Leia o codigo QR abaixo com a camara (iPhone) ou com o Expo Go (Android), na mesma rede Wi-Fi.
echo.
call npx expo start --go --tunnel
pause
