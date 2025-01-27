from fastapi import FastAPI
from app.routers import users, stations, bookings, payments
from fastapi.middleware.cors import CORSMiddleware
from app.routers import items
from app.routers.users import auth_router as auth
from app.database import db
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import stripe

# Initialize Stripe
stripe.api_key = "sk_test_51QckczKfahkTtl2nMGfhmvDSBqufAHvFyW6SdntFH4yPU8dUYlGQ5FWkCBZzPgjawThjSSnrd7AXMedMVvVl441M00gBhoiYGx"

# Pydantic model for the payment request
class PaymentRequest(BaseModel):
    paymentMethodId: str
    amount: int

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/confirm-payment")
async def confirm_payment(payment_request: PaymentRequest):
    print("Received payment request:", payment_request)
    try:
        # Log payment method ID and amount for debugging
        print(f"Payment Method ID: {payment_request.paymentMethodId}")
        print(f"Amount: {payment_request.amount}")

        payment_intent = stripe.PaymentIntent.create(
    amount=payment_request.amount,  # Amount in cents
    currency="usd",
    payment_method=payment_request.paymentMethodId,
    confirm=True,
    automatic_payment_methods={
        'enabled': True,
        'allow_redirects': 'never'
    }
)

        print("Payment intent created successfully:", payment_intent)
        return {"success": True, "paymentIntent": payment_intent}

    except stripe.error.StripeError as e:
        # Log the detailed error response
        print(f"Stripe error: {e.user_message}")
        print(f"Stripe error details: {e.json_body}")
        raise HTTPException(status_code=400, detail=f"Payment failed: {e.user_message}")
    except Exception as e:
        # Log unexpected errors
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Include routers for the various endpoints
app.include_router(users.auth_router)
app.include_router(stations.router)
app.include_router(bookings.router)
app.include_router(payments.router, prefix="/payments", tags=["payments"])
app.include_router(auth)
app.include_router(items.items_router)
