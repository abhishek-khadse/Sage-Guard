from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
import os
from dotenv import load_dotenv
from loguru import logger
from typing import Optional, Dict, Tuple

load_dotenv()

class GeocodingService:
    def __init__(self):
        self.geolocator = Nominatim(user_agent="sage_guard")
        self.google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    
    async def reverse_geocode(self, latitude: float, longitude: float) -> Dict:
        """Convert coordinates to address"""
        try:
            location = self.geolocator.reverse(f"{latitude}, {longitude}")
            if not location:
                return {
                    "address": "Unknown location",
                    "city": "Unknown",
                    "postal_code": "Unknown"
                }
            
            address = location.address
            raw = location.raw
            
            return {
                "address": address,
                "city": raw.get("address", {}).get("city", "Unknown"),
                "postal_code": raw.get("address", {}).get("postcode", "Unknown"),
                "raw": raw
            }
        except (GeocoderTimedOut, GeocoderUnavailable) as e:
            logger.error(f"Geocoding error: {str(e)}")
            return {
                "address": "Location service unavailable",
                "city": "Unknown",
                "postal_code": "Unknown"
            }
        except Exception as e:
            logger.error(f"Error in reverse_geocode: {str(e)}")
            raise
    
    async def geocode(self, address: str) -> Optional[Tuple[float, float]]:
        """Convert address to coordinates"""
        try:
            location = self.geolocator.geocode(address)
            if not location:
                return None
            
            return (location.latitude, location.longitude)
        except (GeocoderTimedOut, GeocoderUnavailable) as e:
            logger.error(f"Geocoding error: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error in geocode: {str(e)}")
            raise
    
    async def get_location_details(self, latitude: float, longitude: float) -> Dict:
        """Get detailed location information"""
        try:
            # First try reverse geocoding
            address_info = await self.reverse_geocode(latitude, longitude)
            
            # If we have Google Maps API key, get additional details
            if self.google_maps_api_key:
                # TODO: Implement Google Maps API calls for additional details
                # This could include:
                # - Nearby landmarks
                # - Traffic information
                # - Road conditions
                pass
            
            return {
                "coordinates": {
                    "latitude": latitude,
                    "longitude": longitude
                },
                "address": address_info["address"],
                "city": address_info["city"],
                "postal_code": address_info["postal_code"],
                "additional_info": address_info.get("raw", {})
            }
        except Exception as e:
            logger.error(f"Error in get_location_details: {str(e)}")
            raise

# Initialize the service
geocoding_service = GeocodingService() 