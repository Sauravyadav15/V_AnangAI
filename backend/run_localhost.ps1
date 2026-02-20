# Run the FastAPI backend on localhost
Set-Location $PSScriptRoot
Write-Host "Starting FastAPI server on http://localhost:8000" -ForegroundColor Green
Write-Host ""
python -m uvicorn api.main:app --host 127.0.0.1 --port 8000 --reload

