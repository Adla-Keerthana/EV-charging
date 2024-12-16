from app.models.models import Booking
from app.database import db

def book_slot(station_id: int, user_id: int, time_slot: str):
    # Access MongoDB collection
    bookings_collection = db["bookings"]

    # Check if the slot is already booked
    existing_booking = bookings_collection.find_one({"station_id": station_id, "time_slot": time_slot})
    if existing_booking:
        return None  # Slot already booked

    # Create a new booking instance
    booking = {
        "user_id": user_id,
        "station_id": station_id,
        "time_slot": time_slot,
        "status": "booked"
    }

    # Insert into MongoDB
    result = bookings_collection.insert_one(booking)
    booking["_id"] = str(result.inserted_id)  # Add the ID to the booking object
    return booking
