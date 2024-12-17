from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from app.auth import get_current_user  # Dependency for getting the current user
from app.database import db  # MongoDB database connection
from bson import ObjectId

router = APIRouter()


# Define the Booking model
class Booking(BaseModel):
    station_id: str
    time_slot: str
    user_id: str
    full_name: str
    email: str
    vehicle_number: str


# Booking endpoint with user dependency
@router.post("/bookings/book")
async def book_slot(booking: Booking):  # Inject the current user
    try:
        # Ensure the user is authenticated

        # Add user_id from the authenticated user to the booking
        booking_data = booking.dict()  # Assuming user has an "id" field

        # Insert the booking data into MongoDB
        result = await db["Bookings"].insert_one(booking_data)

        # Return a success response if insertion succeeds
        if result.inserted_id:
            return JSONResponse(
                content={
                    "message": "Booking confirmed!",
                    "booking_id": str(result.inserted_id),
                },
                status_code=200,
            )
        else:
            raise HTTPException(
                status_code=500, detail="Booking failed. Please try again."
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error booking the slot: {str(e)}")


@router.get("/api/bookings")
async def get_user_bookings(
    user_id: str,  # Ensures user is authenticated
):
    try:
        print("user_id", user_id)
        # Check if user ID matches the current authenticated user
        if not user_id:
            raise HTTPException(status_code=400, detail="User ID is required.")

        # Fetch bookings for the given user_id
        bookings_cursor = db["Bookings"].find({"user_id": (user_id)})
        bookings = await bookings_cursor.to_list(length=100)  # Fetch max 100 records

        if not bookings:
            raise HTTPException(
                status_code=404, detail=f"No bookings found for user ID: {user_id}"
            )

        # Optionally exclude sensitive fields (e.g., MongoDB ObjectId)
        for booking in bookings:
            booking["_id"] = str(booking["_id"])  # Convert ObjectId to string if needed

        return {"bookings": bookings}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching bookings: {e}")
