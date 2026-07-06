from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.auth.auth_handler import get_current_user
from app.models.user import User

from app.schemas.job_match import (
    JobMatchRequest,
    JobMatchResponse
)

from app.services.job_match_service import analyze_job_match

router = APIRouter(
    prefix="/job-match",
    tags=["Job Match"]
)


@router.post(
    "/",
    response_model=JobMatchResponse
)
def match_job(
    request: JobMatchRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = analyze_job_match(
        db=db,
        resume_id=request.resume_id,
        user_id=current_user.id,
        job_description=request.job_description
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return result
