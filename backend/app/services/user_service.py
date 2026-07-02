from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.auth.hashing import hash_password
from app.auth.hashing import verify_password

def get_user_by_email(db: Session, email: str):
    """
    Return a user if the email exists.
    """
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    """
    Create a new user in the database.
    """

    hashed_pwd = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def authenticate_user(db: Session, email: str, password: str):
    """
    Authenticate a user using email and password.
    Returns the user if authentication succeeds, otherwise None.
    """

    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user