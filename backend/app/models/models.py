
from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional
from typing import List

class ItemModel(BaseModel):
    id: Optional[str] = Field(default_factory=str, alias="_id")
    name: str
    description: str


class UserModel(BaseModel):
    username: str
    password: str

class ChargingStation(BaseModel):
    station_id: int
    name: str
    lat: float
    lng: float
    available_slots: int

class Booking(BaseModel):
    user_id: int
    station_id: int
    time_slot: str
    status: str  # "booked", "pending", etc.

class Payment(BaseModel):
    user_id: int
    amount: float
    payment_method: str
    status: str  # "success", "failed"
