@echo off
REM Run the FastAPI backend on localhost
cd /d "%~dp0"
echo Starting FastAPI server on http://localhost:8000
echo.
python -m uvicorn api.main:app --host 127.0.0.1 --port 8000 --reload
pause

