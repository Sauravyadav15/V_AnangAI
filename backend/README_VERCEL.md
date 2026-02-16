# Backend Vercel Deployment - Quick Reference

## File Structure
```
backend/
├── api/
│   └── index.py          # Vercel serverless function handler
├── main.py               # FastAPI application (main app)
├── vercel.json           # Vercel configuration
└── requirements.txt      # Python dependencies
```

## How It Works

1. **Vercel receives request** → Routes to `api/index.py` (via vercel.json)
2. **api/index.py** → Imports `app` from `main.py` and wraps it with Mangum
3. **Mangum** → Converts FastAPI (ASGI) to AWS Lambda/Vercel format
4. **FastAPI app** → Handles the request and returns response

## Entry Points

- **Local Development**: `main.py` (run with `uvicorn main:app`)
- **Vercel Deployment**: `api/index.py` (automatically used by Vercel)

## Environment Variables Needed

In Vercel Dashboard → Settings → Environment Variables:

1. `OPENROUTER_API_KEY` - Your OpenRouter API key
2. `FRONTEND_URL` - Your frontend Vercel URL (e.g., `https://your-frontend.vercel.app`)

## Testing

After deployment, test these endpoints:

- Health check: `https://your-backend.vercel.app/health`
- API endpoint: `https://your-backend.vercel.app/api/health` (if you have one)

## Troubleshooting

### If backend doesn't work:

1. **Check Vercel logs**: Dashboard → Deployments → Latest → Function Logs
2. **Verify environment variables** are set correctly
3. **Test health endpoint** directly in browser
4. **Check CORS** - Make sure frontend URL is in allowed origins
5. **Verify dependencies** - All packages in `requirements.txt` are installed

### Common Issues:

- **Import errors**: Check that `main.py` and `router.py` are in the same directory
- **Path issues**: The `api/index.py` changes working directory to backend folder
- **CORS errors**: Update `FRONTEND_URL` environment variable and redeploy

