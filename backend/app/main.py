from fastapi import FastAPI
from app.routers import users, stations, bookings, payments
from fastapi.middleware.cors import CORSMiddleware
from app.routers import items
from app.routers.users import auth_router as auth


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include routers for the various endpoints
app.include_router(users.auth_router)
app.include_router(stations.router)
app.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
app.include_router(payments.router, prefix="/payments", tags=["payments"])
app.include_router(auth)
app.include_router(items.items_router)
# Define your routes
