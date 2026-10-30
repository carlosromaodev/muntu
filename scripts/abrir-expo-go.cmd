@echo off
if exist "%LOCALAPPDATA%\muntu-node\node.exe" set "PATH=%LOCALAPPDATA%\muntu-node;%PATH%"
title MUNTU - Expo Go
cd /d "%~dp0..\apps\ios-android"
echo.
echo  Abra a app Expo Go no telemovel (mesma rede Wi-Fi que este computador)
echo  e leia o codigo QR que aparece abaixo.
echo  Se o telemovel nao ligar, feche esta janela e use abrir-expo-go-tunel.cmd
echo.
call npx expo start --go
pause
