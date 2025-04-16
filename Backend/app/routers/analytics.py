from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Optional
from datetime import datetime, timedelta
import pandas as pd
from ..db.supabase import supabase_client
from ..auth.auth import get_current_user, get_admin_user
from loguru import logger

router = APIRouter()

@router.get("/hourly")
async def get_hourly_analytics(
    days: int = 7,
    current_user: dict = Depends(get_current_user)
):
    """Get hourly incident statistics for the last N days"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        result = supabase_client.table("incidents").select("*").gte("created_at", start_date).lte("created_at", end_date).execute()
        
        if not result.data:
            return {"hourly_stats": []}
        
        # Convert to DataFrame for analysis
        df = pd.DataFrame(result.data)
        df['created_at'] = pd.to_datetime(df['created_at'])
        df['hour'] = df['created_at'].dt.hour
        
        # Group by hour and count incidents
        hourly_stats = df.groupby('hour').size().reset_index(name='count')
        
        return {"hourly_stats": hourly_stats.to_dict('records')}
    except Exception as e:
        logger.error(f"Error in hourly analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/location-hotspots")
async def get_location_hotspots(
    days: int = 30,
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    """Get top N accident hotspots by location"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        result = supabase_client.table("incidents").select("*").gte("created_at", start_date).lte("created_at", end_date).execute()
        
        if not result.data:
            return {"hotspots": []}
        
        # Convert to DataFrame for analysis
        df = pd.DataFrame(result.data)
        
        # Group by location and count incidents
        hotspots = df.groupby(['latitude', 'longitude', 'location']).size().reset_index(name='count')
        hotspots = hotspots.sort_values('count', ascending=False).head(limit)
        
        return {"hotspots": hotspots.to_dict('records')}
    except Exception as e:
        logger.error(f"Error in location hotspots: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/severity")
async def get_severity_analytics(
    days: int = 30,
    current_user: dict = Depends(get_current_user)
):
    """Get incident statistics by severity"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        result = supabase_client.table("incidents").select("*").gte("created_at", start_date).lte("created_at", end_date).execute()
        
        if not result.data:
            return {"severity_stats": []}
        
        # Convert to DataFrame for analysis
        df = pd.DataFrame(result.data)
        
        # Group by severity and count incidents
        severity_stats = df.groupby('severity').size().reset_index(name='count')
        
        return {"severity_stats": severity_stats.to_dict('records')}
    except Exception as e:
        logger.error(f"Error in severity analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/export/csv")
async def export_analytics_csv(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: dict = Depends(get_admin_user)
):
    """Export analytics data to CSV (admin only)"""
    try:
        query = supabase_client.table("incidents").select("*")
        
        if start_date:
            query = query.gte("created_at", start_date)
        if end_date:
            query = query.lte("created_at", end_date)
        
        result = query.execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="No data found for the specified period")
        
        # Convert to DataFrame
        df = pd.DataFrame(result.data)
        
        # Generate CSV
        csv_data = df.to_csv(index=False)
        
        return {
            "filename": f"analytics_export_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv",
            "data": csv_data
        }
    except Exception as e:
        logger.error(f"Error exporting analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 