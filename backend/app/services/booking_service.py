from app.models.models import Booking

# In-memory booking database
bookings_db = {}

def book_slot(station_id: int, user_id: int, time_slot: str):
    if (station_id, time_slot) in bookings_db:
        return None  # Slot already booked
    booking = Booking(user_id=user_id, station_id=station_id, time_slot=time_slot, status="booked")
    bookings_db[(station_id, time_slot)] = booking
    return booking
