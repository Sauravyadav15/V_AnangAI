# Vercel Handler Fix

## The Problem
Vercel was getting a `TypeError: issubclass() arg 1 must be a class` error because:
- Vercel's runtime tries to auto-detect handler types during import
- Importing FastAPI/Mangum at module level was conflicting with this detection

## The Solution
Changed to **lazy imports** - the FastAPI app and Mangum are only imported when the handler function is actually called, not at module import time.

## What Changed
- `handler` is now a function (not an object)
- FastAPI and Mangum imports happen inside the handler function
- This avoids conflicts with Vercel's handler detection

## Testing
After deploying, test:
1. Health endpoint: `https://your-backend.vercel.app/health`
2. API endpoint: `https://your-backend.vercel.app/api/health`

If you still get errors, check Vercel Function Logs for the specific error message.

