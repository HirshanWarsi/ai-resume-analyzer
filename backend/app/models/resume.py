from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy import Text

from app.database.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    original_filename = Column(String, nullable=False)

    stored_filename = Column(String, nullable=False)

    file_path = Column(String, nullable=False)

    file_size = Column(Integer)

    extracted_text = Column(Text, nullable=True)

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )