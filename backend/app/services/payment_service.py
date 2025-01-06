from app.models.models import Payment

# In-memory database for demonstration
payments_db = {}

def process_payment(user_id: int, amount: float, payment_method: str) -> bool:
    # Mock payment process
    payment = Payment(user_id=user_id, amount=amount, payment_method=payment_method, status="success")
    payments_db[user_id] = payment
    return True
