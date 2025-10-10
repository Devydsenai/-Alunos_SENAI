@echo off
cls
echo ========================================
echo   🎬 INICIANDO API DE POLTRONAS
echo ========================================
echo.
echo Navegando para pasta api...
cd /d "%~dp0\api"
echo.
echo Iniciando servidor na porta 3000...
echo.
node index.js
echo.
pause

