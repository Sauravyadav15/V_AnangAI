# Run the backend API (uses python -m uvicorn so uvicorn doesn't need to be on PATH)
Set-Location $PSScriptRoot
python -m uvicorn main:app --reload --port 8000
