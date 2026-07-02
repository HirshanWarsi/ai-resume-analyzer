from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import create_user, get_user_by_email
from app.schemas.user import UserLogin
from app.services.user_service import authenticate_user
from app.auth.jwt_handler import create_access_token
from app.auth.auth_handler import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED 
)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    return create_user(db, user)

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    authenticated_user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": authenticated_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user