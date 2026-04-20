from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from video_processor import VideoProcessor
import os

app = FastAPI(title="Movie Editor API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize video processor
processor = VideoProcessor()

@app.get("/")
async def root():
    return {"message": "Movie Editor API", "version": "1.0.0"}

@app.post("/video/upload")
async def upload_video(file: UploadFile = File(...)):
    """Upload a video file"""
    try:
        result = await processor.process_upload(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/video/resize")
async def resize_video(video_url: str, width: int, height: int):
    """Resize video to specified dimensions"""
    try:
        result = await processor.resize_video(video_url, width, height)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/video/color")
async def apply_color(video_url: str, preset: dict):
    """Apply color preset to video"""
    try:
        result = await processor.apply_color_preset(video_url, preset)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/video/animation")
async def apply_animation(video_url: str, animation: dict):
    """Apply animation to video"""
    try:
        result = await processor.apply_animation(video_url, animation)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/video/subtitle")
async def add_subtitles(video_url: str, subtitles: list, style: dict):
    """Add subtitles to video"""
    try:
        result = await processor.add_subtitles(video_url, subtitles, style)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/video/export")
async def export_video(video_url: str, format: str = "mp4", quality: str = "high"):
    """Export video with specified format"""
    try:
        result = await processor.export_video(video_url, format, quality)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/video/status/{job_id}")
async def get_status(job_id: str):
    """Get processing job status"""
    try:
        result = await processor.get_status(job_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)