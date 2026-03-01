from sqlalchemy import create_all, Column, Integer, String, JSON, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

Base = declarative_base()

class Paper(Base):
    __tablename__ = "papers"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    upload_date = Column(DateTime, default=datetime.utcnow)
    analysis_data = Column(JSON)  # Stores the structured analysis
    pptx_path = Column(String)

# Database connection setup (placeholder)
# engine = create_engine(os.getenv("DATABASE_URL"))
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
