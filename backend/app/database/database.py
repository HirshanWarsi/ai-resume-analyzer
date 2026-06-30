from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import text
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Create database engine
try:
    engine = create_engine(
        DATABASE_URL, echo=True, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
    )
    # Test the connection
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
except Exception as e:
    print(f"⚠️  Database connection failed: {e}")
    print(f"📝 DATABASE_URL: {DATABASE_URL}")
    print("\n❌ Fix this by updating your .env file:")
    print("   1. Check your PostgreSQL password is correct")
    print("   2. Or use SQLite by setting: DATABASE_URL=sqlite:///./ai_resume_analyzer.db")
    engine = None

# Create session factory
if engine:
    SessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
else:
    SessionLocal = None

# Base class for all database models
Base = declarative_base()