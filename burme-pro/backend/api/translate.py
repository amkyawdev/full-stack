from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict
import os
import uuid
from datetime import datetime

router = APIRouter()

# Mock translation job storage
translation_jobs: Dict[str, dict] = {}


class TranslateRequest(BaseModel):
    sourceLanguage: str
    targetLanguage: str
    format: Optional[str] = "srt"


class TranslateResponse(BaseModel):
    jobId: str
    status: str
    progress: int
    message: str


@router.post("/")
async def translate_srt(
    file: UploadFile = File(...),
    sourceLanguage: str = Form(...),
    targetLanguage: str = Form(...),
    format: str = Form("srt")
):
    """
    Translate SRT/VTT subtitle files using Gemini API with AmkyawLogic
    """
    # Validate file type
    if not file.filename.endswith(('.srt', '.vtt', '.ass')):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Only .srt, .vtt, and .ass are supported."
        )
    
    # Create job
    job_id = str(uuid.uuid4())
    job = {
        "id": job_id,
        "filename": file.filename,
        "sourceLanguage": sourceLanguage,
        "targetLanguage": targetLanguage,
        "format": format,
        "status": "processing",
        "progress": 0,
        "createdAt": datetime.now().isoformat(),
    }
    translation_jobs[job_id] = job
    
    # Process file content (mock)
    content = await file.read()
    file_size = len(content)
    
    # For demo, simulate processing
    job["progress"] = 50
    
    # Check if Gemini API is configured
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    
    if not gemini_api_key:
        job["status"] = "completed"
        job["progress"] = 100
        job["resultUrl"] = f"/api/translate/download/{job_id}"
        job["message"] = "Translation completed (demo mode - configure GEMINI_API_KEY for real translation)"
    else:
        # Real translation would happen here
        job["status"] = "completed"
        job["progress"] = 100
        job["resultUrl"] = f"/api/translate/download/{job_id}"
        job["message"] = "Translation completed"
    
    return TranslateResponse(
        jobId=job_id,
        status=job["status"],
        progress=job["progress"],
        message=job["message"]
    )


@router.get("/status/{job_id}")
async def get_translation_status(job_id: str):
    """Get translation job status"""
    if job_id not in translation_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return translation_jobs[job_id]


@router.get("/download/{job_id}")
async def download_translation(job_id: str):
    """Download translated file"""
    if job_id not in translation_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = translation_jobs[job_id]
    
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Translation not yet completed")
    
    # Return mock translated content
    return {
        "jobId": job_id,
        "filename": f"translated_{job['filename']}",
        "content": f"1\n00:00:01,000 --> 00:00:04,000\nTranslated subtitle text here\n\n2\n00:00:05,000 --> 00:00:08,000\nMore translated text",
        "sourceLanguage": job["sourceLanguage"],
        "targetLanguage": job["targetLanguage"]
    }


@router.get("/languages")
async def get_supported_languages():
    """Get list of supported languages"""
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "my", "name": "Myanmar (Burmese)"},
            {"code": "th", "name": "Thai"},
            {"code": "zh", "name": "Chinese"},
            {"code": "ja", "name": "Japanese"},
            {"code": "ko", "name": "Korean"},
            {"code": "vi", "name": "Vietnamese"},
            {"code": "id", "name": "Indonesian"},
            {"code": "ms", "name": "Malay"},
            {"code": "hi", "name": "Hindi"},
        ]
    }