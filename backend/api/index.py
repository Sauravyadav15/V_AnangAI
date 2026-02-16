"""
Vercel serverless function handler for FastAPI backend.
This wraps the FastAPI app to work with Vercel's serverless functions.
"""
import sys
from pathlib import Path

# Add parent directory to path so we can import main
sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app
from mangum import Mangum

# Create ASGI handler for Vercel
handler = Mangum(app, lifespan="off")

def lambda_handler(event, context):
    """
    Vercel serverless function entry point.
    """
    return handler(event, context)

