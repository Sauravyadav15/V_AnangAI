"""
Simple test endpoint to verify Vercel Python is working
"""
def handler(event, context):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": '{"status": "ok", "message": "Vercel Python is working"}'
    }

