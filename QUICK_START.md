# Quick Start Guide - Run Frontend and Backend Locally

## Prerequisites

1. **Python 3.11+** installed
2. **Node.js** installed (for frontend)
3. **Dependencies installed**

## Step 1: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Step 3: Start Backend Server

**In Terminal 1:**
```bash
cd backend
python -m uvicorn api.main:app --host 127.0.0.1 --port 8000 --reload
```

Or use the run script:
- **PowerShell:** `.\run_localhost.ps1`
- **Command Prompt:** `run_localhost.bat`

**Verify backend is running:**
- Open http://127.0.0.1:8000/health in browser
- Should see: `{"status":"ok"}`
- API docs: http://127.0.0.1:8000/docs

## Step 4: Start Frontend Server

**In Terminal 2:**
```bash
cd frontend
npm run dev
```

**Frontend will be available at:**
- http://localhost:5173

## Troubleshooting

### Backend won't start
- Make sure port 8000 is not in use
- Check Python version: `python --version` (should be 3.11+)
- Install dependencies: `pip install -r requirements.txt`

### Frontend can't connect to backend
- **Make sure backend is running first!** (Step 3)
- Check backend health: http://127.0.0.1:8000/health
- Check browser console for errors
- Verify Vite proxy in `frontend/vite.config.js` points to `http://localhost:8000`

### CORS errors
- Backend CORS is configured for:
  - http://localhost:5173
  - http://127.0.0.1:5173
  - http://localhost:5174
  - http://127.0.0.1:5174
- If using a different port, update CORS in `backend/api/main.py`

## File Structure

```
KingstonAssist/
├── backend/          # FastAPI backend
│   ├── api/
│   │   ├── main.py   # Main FastAPI app
│   │   └── index.py  # Vercel handler
│   ├── router.py     # RAG functions
│   └── ...
└── frontend/         # React frontend
    ├── src/
    └── vite.config.js  # Proxy config
```

## What Was Fixed

1. ✅ **vercel.json** - Now correctly uses `api/index.py` for Vercel deployment
2. ✅ **index.py** - Fixed import paths to correctly load main.py
3. ✅ **main.py** - Fixed BASE_DIR to point to backend root
4. ✅ **Localhost scripts** - Created run scripts for easy local development

## Next Steps

1. Start backend (Terminal 1)
2. Start frontend (Terminal 2)
3. Open http://localhost:5173 in your browser
4. Your app should be running! 🎉

