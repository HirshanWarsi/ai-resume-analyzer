Set-Location "$PSScriptRoot\backend"

.\venv\Scripts\Activate.ps1

python -m uvicorn app.main:app --reload