@echo off
rem Instala as dependências e verifica que o Expo compila as duas versões web sem erros.
rem O resultado fica em scripts\verificar.log
cd /d "%~dp0.."
echo MUNTU - verificacao %date% %time% > scripts\verificar.log
echo. >> scripts\verificar.log
echo === node / npm === >> scripts\verificar.log
call node -v >> scripts\verificar.log 2>&1
call npm -v >> scripts\verificar.log 2>&1
echo === npm install === >> scripts\verificar.log
call npm install --no-audit --no-fund >> scripts\verificar.log 2>&1
echo EXIT npm install %errorlevel% >> scripts\verificar.log
echo === expo install --fix === >> scripts\verificar.log
call npm run fix-deps >> scripts\verificar.log 2>&1
echo EXIT fix-deps %errorlevel% >> scripts\verificar.log
echo === web desktop: expo export === >> scripts\verificar.log
call npm run build --workspace @muntu/web-desktop >> scripts\verificar.log 2>&1
echo EXIT build web-desktop %errorlevel% >> scripts\verificar.log
echo === web mobile: expo export === >> scripts\verificar.log
call npm run build --workspace @muntu/web-mobile >> scripts\verificar.log 2>&1
echo EXIT build web-mobile %errorlevel% >> scripts\verificar.log
echo === android: expo export (bundle nativo) === >> scripts\verificar.log
call npm exec --workspace @muntu/ios-android -- expo export --platform android --output-dir dist-android >> scripts\verificar.log 2>&1
echo EXIT export android %errorlevel% >> scripts\verificar.log
echo === FIM === >> scripts\verificar.log
