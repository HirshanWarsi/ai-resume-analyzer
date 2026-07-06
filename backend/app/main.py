from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.user import User
from app.models.resume import Resume
from app.models.resume_analysis import ResumeAnalysis
from app.models.job_match import JobMatch
from app.routers.resume import router as resume_router
from app.routers.auth import router as auth_router
from app.routers.job_match import router as job_match_router

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(job_match_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Resume Analyzer API"
    }