from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import os

router = APIRouter()


class VoiceRequest(BaseModel):
    text: str
    voiceId: Optional[str] = "21m00Tcm4TlvDq8ikWAM"
    model: Optional[str] = "eleven_monolingual_v1"
    stability: Optional[float] = 0.5
    similarityBoost: Optional[float] = 0.75


class VoiceResponse(BaseModel):
    audioUrl: str
    duration: float
    voiceId: str
    model: str


class Voice(BaseModel):
    id: str
    name: str
    category: str
    description: str


# Default ElevenLabs voices
DEFAULT_VOICES = [
    Voice(
        id="21m00Tcm4TlvDq8ikWAM",
        name="Rachel",
        category="v2",
        description="A female voice with a clear, professional tone"
    ),
    Voice(
        id="AZnzlk1XvdvUeBnXmlgg",
        name="Drew",
        category="v2",
        description="A male voice with a deep, authoritative tone"
    ),
    Voice(
        id="CwhRBWXzGAHq8TQ4Fs17",
        name="Roger",
        category="v2",
        description="A male voice with a confident, engaging tone"
    ),
    Voice(
        id="pNInz6obpgDQGcFmaJgB",
        name="Adam",
        category="v2",
        description="A male voice with a deep, storytelling tone"
    ),
    Voice(
        id="yoZ06RuRjCuAILDbTXcA",
        name="Sam",
        category="v2",
        description="A youthful, energetic male voice"
    ),
]


@router.post("/speak")
async def text_to_speech(request: VoiceRequest):
    """
    Convert text to speech using ElevenLabs API
    """
    elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
    
    if not elevenlabs_api_key:
        # Return mock response for demo
        # Calculate approximate duration (average 150 words per minute)
        word_count = len(request.text.split())
        duration = (word_count / 150) * 60
        
        return VoiceResponse(
            audioUrl=f"/api/voice/audio/{request.voiceId}/demo",
            duration=duration,
            voiceId=request.voiceId,
            model=request.model
        )
    
    # Real ElevenLabs API implementation
    # This would make actual API call to ElevenLabs
    return VoiceResponse(
        audioUrl="https://api.elevenlabs.io/v1/audio/demo",
        duration=len(request.text) / 150,  # Approximate
        voiceId=request.voiceId,
        model=request.model
    )


@router.get("/voices", response_model=List[Voice])
async def get_voices():
    """
    Get list of available ElevenLabs voices
    """
    elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
    
    if not elevenlabs_api_key:
        # Return default voices for demo
        return DEFAULT_VOICES
    
    # In production, fetch from ElevenLabs API
    # For now, return default voices
    return DEFAULT_VOICES


@router.get("/voices/{voice_id}", response_model=Voice)
async def get_voice(voice_id: str):
    """Get specific voice by ID"""
    for voice in DEFAULT_VOICES:
        if voice.id == voice_id:
            return voice
    
    raise HTTPException(status_code=404, detail="Voice not found")


@router.get("/models")
async def get_models():
    """Get available ElevenLabs models"""
    return {
        "models": [
            {"id": "eleven_monolingual_v1", "name": "Eleven Mono v1"},
            {"id": "eleven_multilingual_v1", "name": "Eleven Multi v1"},
            {"id": "eleven_multilingual_v2", "name": "Eleven Multi v2"},
        ]
    }