import requests
from typing import List
from app.models.models import ChargingStation

API_KEY = "AlzaSytXtChtz8euiDoT5-OGlwYF4a6KSvGylxd"
GOMAPS_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

async def get_nearby_stations(lat: float, lng: float) -> List[ChargingStation]:
    url = f"{GOMAPS_API_URL}?location={lat},{lng}&radius=5000&type=charging_station&key={API_KEY}"
    response = requests.get(url)
    stations = response.json().get("results", [])

    return [
        ChargingStation(
            station_id=station["place_id"],
            name=station["name"],
            lat=station["geometry"]["location"]["lat"],
            lng=station["geometry"]["location"]["lng"],
            available_slots=station.get("available_slots", 0),  # Update based on API response
        )
        for station in stations
    ]
