from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from services.amkyaw_logic import process_with_amkyaw_logic

router = APIRouter()

# Mock chat history storage (in production, use database)
chat_history_store = {}


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    model: Optional[str] = "llama-3.1-8b-instant"


class ChatResponse(BaseModel):
    message: str
    done: bool
    model: str


@router.post("/")
async def chat(request: ChatRequest):
    """
    Chat endpoint using Groq API with AmkyawLogic 3-Stage Reasoning
    """
    groq_api_key = os.getenv("GROQ_API_KEY")
    
    if not groq_api_key or groq_api_key == "your_groq_api_key_here":
        # Return mock response for demo
        context = await process_with_amkyaw_logic(
            request.message,
            chat_model=request.model
        )
        
        mock_responses = {
            "hello": "Hello! I'm your AI assistant powered by Groq. How can I help you today?",
            "translate": "I can help you translate text! Go to the Translate page to upload your SRT file.",
            "voice": "I can convert text to speech using ElevenLabs! Visit the Speak page to try it.",
            "default": f"I received your message: '{request.message}'. This is a demo response. Configure GROQ_API_KEY for full functionality."
        }
        
        message_lower = request.message.lower()
        response_text = next(
            (v for k, v in mock_responses.items() if k in message_lower),
            mock_responses["default"]
        )
        
        return ChatResponse(
            message=response_text,
            done=True,
            model=request.model
        )
    
    # Real Groq API implementation would go here
    # For now, return the same mock response
    return ChatResponse(
        message=f"Groq API configured. Processing: {request.message}",
        done=True,
        model=request.model
    )


@router.post("/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming chat endpoint using Server-Sent Events
    """
    async def generate():
        groq_api_key = os.getenv("GROQ_API_KEY")
        
        if not groq_api_key or groq_api_key == "your_groq_api_key_here":
            # Simulate streaming response
            response_parts = [
                "I ",
                "can ",
                "help ",
                "you ",
                "with ",
                "your ",
                "questions! ",
                "🤖"
            ]
            
            for part in response_parts:
                yield f"data: {part}\n\n"
                import asyncio
                await asyncio.sleep(0.1)
            
            yield "data: [DONE]\n\n"
        else:
            yield "data: Groq API streaming not implemented yet\n\n"
            yield "data: [DONE]\n\n"
    
    return generate()


@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    return {"session_id": session_id, "history": chat_history_store.get(session_id, [])}


@router.delete("/history/{session_id}")
async def clear_chat_history(session_id: str):
    """Clear chat history for a session"""
    if session_id in chat_history_store:
        del chat_history_store[session_id]
    return {"message": "Chat history cleared", "session_id": session_id}