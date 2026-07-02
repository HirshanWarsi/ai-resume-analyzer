from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.user import User
from app.models.resume import Resume
from app.routers.auth import router as auth_router
from app.routers.resume import router as resume_router

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(resume_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Resume Analyzer API"
    }