@echo off
cd /d "%~dp0"

echo Starting Job Notification Tracker...
echo.
echo IMPORTANT: Keep this window OPEN. Closing it will stop the app.
echo When you see "Local: http://localhost:5173" open that URL in your browser.
echo.

start "" cmd /k "npm run dev"

timeout /t 5 /nobreak >nul
start http://localhost:5173

echo.
echo Browser should open shortly. If you see "This site can't be reached", wait 10 seconds and refresh.
pause
