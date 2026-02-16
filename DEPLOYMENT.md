# Vercel Deployment Guide

This guide will walk you through deploying both the frontend (React) and backend (FastAPI) to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)
2. **GitHub/GitLab/Bitbucket Account**: Your code should be in a Git repository
3. **Vercel CLI** (optional): Install with `npm i -g vercel`

## 🚀 Deployment Options

You have two main options:

### Option 1: Deploy Frontend and Backend Separately (Recommended)
- Deploy frontend to Vercel
- Deploy backend to Vercel as serverless functions
- Connect them via environment variables

### Option 2: Deploy Frontend Only on Vercel, Backend Elsewhere
- Deploy frontend to Vercel
- Deploy backend to Railway/Render/Fly.io
- Connect via API URL

---

## 📦 Option 1: Full Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy Backend First

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import your repository**
4. **Configure the backend project:**
   - **Root Directory**: Select `backend` folder
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (or `pip install -r requirements.txt` if needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `OPENROUTER_API_KEY` = `your_api_key_here`
   - Add any other environment variables your backend needs

6. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - **Copy the deployment URL** (e.g., `https://your-backend.vercel.app`)

### Step 3: Deploy Frontend

1. **Go back to Vercel Dashboard**
2. **Click "Add New Project" again**
3. **Import the same repository**
4. **Configure the frontend project:**
   - **Root Directory**: Select `frontend` folder
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend.vercel.app`
     - Replace `your-backend.vercel.app` with your actual backend URL from Step 2

6. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live!

### Step 4: Update CORS Settings (Important!)

After deployment, you need to update the backend CORS settings to allow your frontend domain.

1. **Edit `backend/main.py`**
2. **Update the CORS middleware** to include your Vercel frontend URL:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://your-frontend.vercel.app",  # Add your Vercel frontend URL
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)
```

3. **Commit and push the changes**
4. **Vercel will automatically redeploy**

---

## 🌐 Option 2: Frontend on Vercel, Backend on Railway/Render

### Deploy Backend to Railway (Alternative)

1. **Sign up at [railway.app](https://railway.app)**
2. **Create new project → Deploy from GitHub**
3. **Select your repository**
4. **Configure:**
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Add environment variables** (OPENROUTER_API_KEY, etc.)
6. **Get the Railway URL** (e.g., `https://your-app.railway.app`)

### Deploy Frontend to Vercel

1. Follow **Step 3** from Option 1
2. Set `VITE_API_URL` to your Railway backend URL

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Serverless function timeout
- **Solution**: Vercel has a 10-second timeout on Hobby plan. Consider:
  - Optimizing your API calls
  - Using Vercel Pro for longer timeouts
  - Or deploy backend to Railway/Render

**Problem**: CORS errors
- **Solution**: Make sure your frontend URL is in the `allow_origins` list in `backend/main.py`

**Problem**: File uploads not working
- **Solution**: Vercel serverless functions have limitations. Consider:
  - Using Vercel Blob for file storage
  - Or deploy backend to a platform that supports persistent storage

### Frontend Issues

**Problem**: API calls failing
- **Solution**: 
  - Check `VITE_API_URL` environment variable is set correctly
  - Check browser console for CORS errors
  - Verify backend is deployed and accessible

**Problem**: Build fails
- **Solution**:
  - Check Node.js version (Vercel auto-detects, but you can specify in `package.json`)
  - Check for missing dependencies
  - Review build logs in Vercel dashboard

---

## 📝 Environment Variables Summary

### Backend (Vercel)
- `OPENROUTER_API_KEY` - Your OpenRouter API key

### Frontend (Vercel)
- `VITE_API_URL` - Your backend API URL (e.g., `https://your-backend.vercel.app`)

---

## 🔄 Updating Deployments

### Automatic Deployments
- Vercel automatically deploys when you push to your main branch
- Each push creates a new deployment
- You can preview deployments from pull requests

### Manual Deployments
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel

# Deploy frontend
cd frontend
vercel
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [FastAPI on Vercel](https://vercel.com/guides/deploying-fastapi-with-vercel)

---

## ✅ Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] API endpoints are working
- [ ] File uploads work (if applicable)
- [ ] Custom domain is configured (optional)

---

## 🎉 You're Done!

Your application should now be live on Vercel! 

- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

Remember to update your frontend's `VITE_API_URL` environment variable with your actual backend URL.

