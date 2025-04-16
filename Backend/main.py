from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from loguru import logger
import socketio
import uvicorn
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Sage Guard API server...")
    
    # Mount static files if directory exists
    static_dir = os.path.join(os.path.dirname(__file__), "static")
    if os.path.exists(static_dir):
        app.mount("/static", StaticFiles(directory=static_dir), name="static")
        logger.info("Static files directory mounted")
    else:
        logger.warning("Static files directory not found, skipping mount")
    
    # Initialize ML model
    # Initialize database connections
    # Initialize other services
    
    yield
    
    # Shutdown
    logger.info("Shutting down Sage Guard API server...")
    # Clean up resources

# Initialize FastAPI app with lifespan
app = FastAPI(
    title="Sage Guard API",
    description="AI-powered Road Accident Detection and Emergency Alert System",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logger.add("logs/app.log", rotation="500 MB", retention="10 days")

# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Initialize Socket.IO with custom event handlers
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    logger=True,
    engineio_logger=True
)

@sio.event
async def connect(sid, environ):
    logger.info(f"Client connected: {sid}")
    await sio.emit('connected', {'data': 'Connected to Sage Guard Socket.IO server'}, room=sid)

@sio.event
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")

@sio.event
async def incident(sid, data):
    logger.info(f"Received incident data from {sid}: {data}")
    # Broadcast the incident to all connected clients except the sender
    await sio.emit('incident', data, skip_sid=sid)

# Create ASGI app with Socket.IO
socket_app = socketio.ASGIApp(sio, app)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Import and include routers
from app.routers import incidents, analytics, media

app.include_router(incidents.router, prefix="/api/incidents", tags=["incidents"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(media.router, prefix="/api/media", tags=["media"])

if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=3001) 