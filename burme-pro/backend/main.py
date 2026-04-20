from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from api import chat, translate, voice

app = FastAPI(
    title="Burme Editing Pro API",
    description="Advanced AI-powered video editing and translation API",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(translate.router, prefix="/api/translate", tags=["Translation"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Burme Editing Pro API",
        "version": "1.0.0",
        "developer": "Aung Myo Kyaw",
        "tiktok": "@amkyaw.dev"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "services": {
            "database": "connected" if os.getenv("DATABASE_URL") else "not configured",
            "groq": "configured" if os.getenv("GROQ_API_KEY") else "not configured",
            "elevenlabs": "configured" if os.getenv("ELEVENLABS_API_KEY") else "not configured",
        }
    }


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "developer": "Aung Myo Kyaw"
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "developer": "Aung Myo Kyaw"
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)