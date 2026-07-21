@echo off
title poCADuchy - Edycja strony
cd /d %~dp0

echo ============================================
echo   Uruchamiam podglad strony i panel CMS...
echo.
echo   Za kilka sekund w przegladarce otworzy sie
echo   panel edycji: http://localhost:3000/admin/
echo.
echo   Jesli panel nie zaladuje sie od razu -
echo   odswiez strone (F5) za kilkanascie sekund.
echo.
echo   Aby zakonczyc edycje - zamknij to okno.
echo ============================================
echo.

start "" cmd /c "timeout /t 12 >nul & start http://localhost:3000/admin/"
call npm run edit

if errorlevel 1 (
  echo.
  echo ============================================
  echo   Podglad sie zacial ^(znany blad bundlera^).
  echo   Czyszcze pamiec podreczna i uruchamiam
  echo   jeszcze raz - odswiez panel w przegladarce
  echo   ^(F5^) za kilkanascie sekund.
  echo ============================================
  echo.
  call npm run clear
  call npm run edit
)

pause
