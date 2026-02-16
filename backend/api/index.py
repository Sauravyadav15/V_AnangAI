"""
Vercel serverless function handler for FastAPI backend.
This wraps the FastAPI app to work with Vercel's serverless functions.
"""
import sys
import os
from pathlib import Path

# Get the backend directory (parent of api/)
backend_dir = Path(__file__).parent.parent
backend_path = str(backend_dir)

# Add backend directory to Python path
sys.path.insert(0, backend_path)

# Change to backend directory for relative file paths
os.chdir(backend_path)

# Import the FastAPI app
from main import app
from mangum import Mangum

# Create the ASGI handler - this is what Vercel will call
handler = Mangum(app, lifespan="off")