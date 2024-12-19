from fastapi import APIRouter
from app.services.payment_service import process_payment
from pydantic import BaseModel
from app.database import db
router = APIRouter()

class PaymentRequest(BaseModel):
    user_id: int
    amount: float
    payment_method: str

@router.post("/process")
async def process_payment_request(payment: PaymentRequest):
    payment_status = process_payment(payment.user_id, payment.amount, payment.payment_method)
    if payment_status:
        return {"message": "Payment processed successfully"}
    return {"message": "Payment failed"}
