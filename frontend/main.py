from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db

from auth import app as auth_app  # Importing the auth app

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Or use "*" to allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


# Initialize the database
init_db()

# Include the authentication router
app.include_router(auth_app)
