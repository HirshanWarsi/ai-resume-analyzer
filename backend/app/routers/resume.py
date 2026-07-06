from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.auth.auth_handler import get_current_user
from app.models.user import User
from app.schemas.upload import UploadResponse
from app.services.resume_service import save_resume
from app.services.analysis_service import get_analysis_by_resume_id
from app.schemas.analysis import ResumeAnalysisResponse
from app.schemas.history import ResumeHistoryResponse
from app.services.resume_service import get_resume_history
from app.models.resume import Resume
from app.models.resume_analysis import ResumeAnalysis

from app.services.export_service import generate_resume_report

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post(
    "/upload",
    response_model=UploadResponse
)
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Allow only PDF files
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    result = save_resume(
        db=db,
        user_id=current_user.id,
        file=file
    )

    return result

@router.get(
    "/{resume_id}/analysis",
    response_model=ResumeAnalysisResponse
)
def get_resume_analysis(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analysis = get_analysis_by_resume_id(
        db,
        resume_id
    )

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return analysis

@router.get(
    "/history",
    response_model=list[ResumeHistoryResponse]
)
def resume_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return get_resume_history(
        db,
        current_user.id
    )

@router.get("/{resume_id}/export")
def export_resume_report(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    analysis = (
        db.query(ResumeAnalysis)
        .filter(
            ResumeAnalysis.resume_id == resume.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    pdf = generate_resume_report(
        resume,
        analysis
    )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f'attachment; filename="Resume_Report_{resume.id}.pdf"'
        },
    )