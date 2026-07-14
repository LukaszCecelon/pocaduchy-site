@echo off
title poCADuchy - Edycja strony
cd /d %~dp0

echo ============================================
echo   Uruchamiam podglad strony i panel CMS...
echo.
echo   Za kilka sekund w przegladarce otworzy sie
echo   panel edycji: http://localhost:3000/admin/
echo.
echo   Aby zakonczyc edycje - po prostu zamknij
echo   to okno.
echo ============================================
echo.

start "" cmd /c "timeout /t 8 >nul & start http://localhost:3000/admin/"
call npm run edit
pause
