@echo off
title poCADuchy - Publikowanie zmian
cd /d %~dp0

echo ============================================
echo   Wysylam zmiany na strone...
echo ============================================
echo.

git add -A
git commit -m "Aktualizacja tresci"
git push

echo.
echo ============================================
echo   Gotowe! Strona zaktualizuje sie automatycznie
echo   w ciagu 2-3 minut pod adresem pocaduchy.pl
echo ============================================
pause
