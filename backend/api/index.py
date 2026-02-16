"""
Vercel serverless function handler for FastAPI backend.
This wraps the FastAPI app to work with Vercel's serverless functions.
"""
import sys
import os
from pathlib import Path

# Add parent directory to path so we can import main
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Change working directory to backend for relative imports
os.chdir(backend_dir)

# Import FastAPI app
from main import app
from mangum import Mangum

# Create ASGI handler for Vercel
handler = Mangum(app, lifespan="off")