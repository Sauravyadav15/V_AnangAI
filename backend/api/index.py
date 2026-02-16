# Minimal module-level code - everything happens in handler function
_handler_cache = None

def handler(event, context):
    """Vercel serverless function entry point."""
    global _handler_cache
    
    if _handler_cache is None:
        import sys
        import os
        from pathlib import Path
        
        # Setup paths
        backend_dir = Path(__file__).parent.parent
        backend_path = str(backend_dir)
        
        if backend_path not in sys.path:
            sys.path.insert(0, backend_path)
        
        os.chdir(backend_path)
        
        # Import and create handler
        from main import app
        from mangum import Mangum
        _handler_cache = Mangum(app, lifespan="off")
    
    return _handler_cache(event, context)