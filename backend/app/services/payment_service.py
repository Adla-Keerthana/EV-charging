from app.models.models import Payment

# In-memory payments database
payments_db = {}

def process_payment(user_id: int, amount: float, payment_method: str) -> bool:
    # Simple mock payment process
    payment = Payment(user_id=user_id, amount=amount, payment_method=payment_method, status="success")
    payments_db[user_id] = payment
    return True
