from fastapi import APIRouter
from app.services.station_service import get_nearby_stations
from pydantic import BaseModel
from app.database import db

router = APIRouter()

class Location(BaseModel):
    lat: float
    lng: float

@router.get("/api/stations")  # Ensure this matches the request in React
async def get_stations():
    print("Entered")
    lat = 40.7128  # Example latitudes
    lng = -74.0060  # Example longitude
    stations = get_nearby_stations(lat, lng)
    return stations
