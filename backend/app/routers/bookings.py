from fastapi import APIRouter
from app.services.booking_service import book_slot
from pydantic import BaseModel

router = APIRouter()

class BookingRequest(BaseModel):
    station_id: int
    user_id: int
    time_slot: str

@router.post("/book")
async def book_slot_request(booking: BookingRequest):
    booking_confirmation = book_slot(booking.station_id, booking.user_id, booking.time_slot)
    if booking_confirmation:
        return {"message": "Slot booked successfully", "details": booking_confirmation}
    return {"message": "Booking failed"}
