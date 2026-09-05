@echo off
netstat -ano | findstr :3000 >nul
if %errorlevel% neq 0 (
  start /b python -m http.server 3000
  timeout /t 1 >nul
)
start "" "http://localhost:3000"
exit
