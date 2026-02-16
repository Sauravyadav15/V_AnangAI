# Quick Start: Deploy to Vercel

## 🚀 Fastest Way to Deploy

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com - it's free)

---

## Step-by-Step Instructions

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy Backend

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Configure Project:**
   - **Root Directory**: Click "Edit" → Enter `backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

4. **Environment Variables:**
   - Click "Environment Variables"
   - Add: `OPENROUTER_API_KEY` = `your_actual_api_key`
   - Add: `FRONTEND_URL` = `https://your-frontend.vercel.app` (you'll update this after frontend deploys)
   - **Note:** Backend env vars don't need `VITE_` prefix (only frontend does)

5. Click **"Deploy"**
6. **Copy the deployment URL** (e.g., `https://kingstonassist-backend.vercel.app`)

### 3. Deploy Frontend

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same** repository
3. **Configure Project:**
   - **Root Directory**: Click "Edit" → Enter `frontend`
   - **Framework Preset**: Vite (auto-detected)
   - Build settings should auto-populate

4. **Environment Variables:**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.vercel.app` (use the URL from Step 2)
   - **Note:** Frontend env vars MUST have `VITE_` prefix to be accessible in client code

5. Click **"Deploy"**
6. **Copy the frontend URL** (e.g., `https://kingstonassist-frontend.vercel.app`)

### 4. Update Backend CORS

1. Go back to your backend project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Update `FRONTEND_URL` with your actual frontend URL
4. Go to **Deployments** → Click the **three dots** on latest deployment → **Redeploy**

### 5. Test Your Deployment

- Visit your frontend URL
- Try logging in or using the chat feature
- Check browser console for any errors

---

## ⚠️ Important Notes

### File Storage Limitation
Vercel serverless functions are **stateless** - files uploaded to `backend/uploads/` will **not persist** between deployments.

**Solutions:**
1. Use Vercel Blob Storage (recommended)
2. Use external storage (AWS S3, Cloudinary, etc.)
3. Deploy backend to Railway/Render (supports persistent storage)

### Timeout Limits
- Hobby plan: 10 seconds per request
- Pro plan: 60 seconds per request

If your API calls take longer, consider:
- Optimizing your code
- Using Vercel Pro
- Deploying backend elsewhere

---

## 🔄 Updating Your App

Every time you push to GitHub:
- Vercel automatically redeploys both projects
- New deployments are created automatically
- Old deployments are kept for rollback

---

## 🆘 Troubleshooting

**Backend not working?**
- Check environment variables are set
- Check deployment logs in Vercel dashboard
- Verify `api/index.py` exists

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in `backend/main.py`
- Check browser console for errors

**Build failing?**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `requirements.txt` or `package.json`
- Check for syntax errors

---

## 📞 Need Help?

- Check `DEPLOYMENT.md` for detailed instructions
- Vercel Docs: https://vercel.com/docs
- Vercel Support: support@vercel.com

---

## ✅ You're Done!

Your app should now be live! 🎉

- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

