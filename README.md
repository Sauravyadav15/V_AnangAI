# KingstonAssist - AnangAI Project

A full-stack AI-powered city guide application for Kingston, Ontario.

## 📁 Project Structure

```
KingstonAssist/
├── backend/          # Python FastAPI backend
│   ├── main.py
│   ├── router.py
│   ├── requirements.txt
│   └── ...
├── frontend/         # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md         # This file
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```

4. Start the backend server:
   ```bash
   # Windows (PowerShell)
   .\run.ps1
   
   # Windows (Command Prompt)
   run.bat
   
   # Or manually
   python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📚 Documentation

- **Frontend Documentation**: See [frontend/README.md](frontend/README.md) for detailed frontend setup and features
- **Backend Documentation**: See backend files for API documentation

## 🛠️ Tech Stack

### Backend
- FastAPI (Python web framework)
- OpenRouter API (LLM provider)
- Uvicorn (ASGI server)

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Framer Motion

## 📝 Notes

- Make sure both backend and frontend servers are running for the full application to work
- The frontend proxies API requests to the backend via Vite's proxy configuration
- Backend runs on port 8000, frontend on port 5173

