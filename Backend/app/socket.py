from fastapi import FastAPI
from socketio import AsyncServer
from socketio.asyncio_namespace import AsyncNamespace
import asyncio
from loguru import logger

class IncidentNamespace(AsyncNamespace):
    async def on_connect(self, sid, environ):
        logger.info(f"Client connected: {sid}")
        await self.emit('connected', {'data': 'Connected to Sage Guard Socket.IO server'})

    async def on_disconnect(self, sid):
        logger.info(f"Client disconnected: {sid}")

    async def on_incident(self, sid, data):
        logger.info(f"Received incident data from {sid}: {data}")
        # Broadcast the incident to all connected clients
        await self.emit('incident', data, skip_sid=sid)

def init_socketio(app: FastAPI):
    sio = AsyncServer(
        async_mode='asgi',
        cors_allowed_origins=['http://localhost:5173', 'http://127.0.0.1:5173'],
        logger=True,
        engineio_logger=True
    )
    
    # Register the namespace
    sio.register_namespace(IncidentNamespace('/'))
    
    # Mount the Socket.IO app
    app.mount("/socket.io", sio)
    
    @app.on_event("startup")
    async def startup_event():
        logger.info("Socket.IO server started")
        
    @app.on_event("shutdown")
    async def shutdown_event():
        logger.info("Socket.IO server shutting down")
        
    return sio 