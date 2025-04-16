from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import List
import os
from datetime import datetime
from ..db.supabase import supabase_client
from ..auth.auth import get_current_user
from loguru import logger

router = APIRouter()

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@router.post("/upload")
async def upload_media(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload media file to Supabase Storage"""
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file selected")
        
        if not allowed_file(file.filename):
            raise HTTPException(
                status_code=400,
                detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            )
        
        # Read file content
        content = await file.read()
        
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File too large")
        
        # Generate unique filename
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        extension = file.filename.rsplit('.', 1)[1].lower()
        filename = f"{current_user['id']}/{timestamp}.{extension}"
        
        # Upload to Supabase Storage
        try:
            result = supabase_client.storage.from_("media").upload(
                file_path=filename,
                file=content,
                file_options={"content-type": file.content_type}
            )
            
            # Get public URL
            url = supabase_client.storage.from_("media").get_public_url(filename)
            
            return {
                "message": "File uploaded successfully",
                "url": url,
                "filename": filename
            }
        except Exception as e:
            logger.error(f"Error uploading to Supabase Storage: {str(e)}")
            raise HTTPException(status_code=500, detail="Error uploading file")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in upload_media: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{filename}")
async def delete_media(
    filename: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete media file from Supabase Storage"""
    try:
        # Verify file ownership
        if not filename.startswith(f"{current_user['id']}/"):
            raise HTTPException(status_code=403, detail="Not authorized to delete this file")
        
        # Delete from Supabase Storage
        try:
            supabase_client.storage.from_("media").remove([filename])
            return {"message": "File deleted successfully"}
        except Exception as e:
            logger.error(f"Error deleting from Supabase Storage: {str(e)}")
            raise HTTPException(status_code=500, detail="Error deleting file")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in delete_media: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 