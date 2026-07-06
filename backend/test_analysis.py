from app.database.database import SessionLocal
from app.models.resume import Resume
from app.services.analysis_service import analyze_and_save_resume

db = SessionLocal()

resume = db.query(Resume).first()

analysis = analyze_and_save_resume(
    db,
    resume
)

print(analysis.ats_score)
print(analysis.summary)