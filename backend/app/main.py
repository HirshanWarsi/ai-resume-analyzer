from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.user import User
from app.routers.auth import router as auth_router

# Import models so SQLAlchemy knows about them
from app.models.user import User

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Resume Analyzer API"
    }