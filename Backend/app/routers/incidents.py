from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import numpy as np
import cv2
from loguru import logger
from ..ml.model import detector
from ..db.supabase import supabase_client
from ..auth.auth import get_current_user

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class IncidentBase(BaseModel):
    location: str
    latitude: float
    longitude: float
    description: Optional[str] = None
    severity: str = "medium"
    status: str = "pending"

class IncidentCreate(IncidentBase):
    pass

class IncidentResponse(IncidentBase):
    id: str
    created_at: datetime
    updated_at: datetime
    user_id: str
    image_url: Optional[str] = None

@router.post("/predict", response_model=dict)
async def predict_accident(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Predict if an image contains an accident"""
    try:
        # Read and decode the image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Make prediction
        prediction = detector.predict(image)
        
        # If accident is detected, create an incident
        if prediction["isAccident"]:
            # Upload image to storage
            image_url = await upload_incident_image(file, current_user["id"])
            
            # Create incident record
            incident_data = {
                "user_id": current_user["id"],
                "location": "Detected via AI",  # TODO: Add geocoding
                "latitude": 0.0,  # TODO: Add GPS data
                "longitude": 0.0,
                "description": f"AI-detected accident with {prediction['confidence']:.2%} confidence",
                "severity": "high",
                "status": "pending",
                "image_url": image_url
            }
            
            result = supabase_client.table("incidents").insert(incident_data).execute()
            
            # Broadcast new incident
            await sio.emit("new_incident", result.data[0])
        
        return prediction
    except Exception as e:
        logger.error(f"Error in predict_accident: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=IncidentResponse)
async def create_incident(
    incident: IncidentCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new incident"""
    try:
        incident_data = incident.dict()
        incident_data["user_id"] = current_user["id"]
        
        result = supabase_client.table("incidents").insert(incident_data).execute()
        return result.data[0]
    except Exception as e:
        logger.error(f"Error creating incident: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[IncidentResponse])
async def get_incidents(
    status: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: dict = Depends(get_current_user)
):
    """Get filtered list of incidents"""
    try:
        query = supabase_client.table("incidents").select("*")
        
        if status:
            query = query.eq("status", status)
        if start_date:
            query = query.gte("created_at", start_date)
        if end_date:
            query = query.lte("created_at", end_date)
        
        result = query.execute()
        return result.data
    except Exception as e:
        logger.error(f"Error getting incidents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{incident_id}", response_model=IncidentResponse)
async def get_incident(
    incident_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get a single incident by ID"""
    try:
        result = supabase_client.table("incidents").select("*").eq("id", incident_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Incident not found")
        return result.data[0]
    except Exception as e:
        logger.error(f"Error getting incident: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{incident_id}", response_model=IncidentResponse)
async def update_incident(
    incident_id: str,
    incident: IncidentCreate,
    current_user: dict = Depends(get_current_user)
):
    """Update an incident"""
    try:
        # Check if user has permission to update
        existing = supabase_client.table("incidents").select("*").eq("id", incident_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail="Incident not found")
        
        result = supabase_client.table("incidents").update(incident.dict()).eq("id", incident_id).execute()
        return result.data[0]
    except Exception as e:
        logger.error(f"Error updating incident: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{incident_id}")
async def delete_incident(
    incident_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete an incident (admin only)"""
    try:
        # Check if user is admin
        if current_user["role"] != "admin":
            raise HTTPException(status_code=403, detail="Only admins can delete incidents")
        
        result = supabase_client.table("incidents").delete().eq("id", incident_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Incident not found")
        return {"message": "Incident deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting incident: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def upload_incident_image(file: UploadFile, user_id: str) -> str:
    """Upload incident image to storage and return URL"""
    try:
        # TODO: Implement image upload to Supabase Storage
        # For now, return a placeholder URL
        return f"https://storage.example.com/incidents/{user_id}/{file.filename}"
    except Exception as e:
        logger.error(f"Error uploading image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 