import bcrypt
from passlib.context import CryptContext
from passlib.exc import UnknownHashError

# Use a hashing scheme that is available in this environment without requiring
# optional bcrypt backend setup during test runs.
pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password:
        return False

    try:
        return pwd_context.verify(plain_password, hashed_password)
    except UnknownHashError:
        if hashed_password.startswith(("$2a$", "$2b$", "$2y$")):
            try:
                return bcrypt.checkpw(
                    plain_password.encode("utf-8"),
                    hashed_password.encode("utf-8"),
                )
            except ValueError:
                return False

        return False
