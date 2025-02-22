from sqlalchemy import create_engine, Column, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from config import Config

engine = create_engine(Config.POSTGRES_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Analysis(Base):
    __tablename__ = "analyses"

    video_id = Column(String, primary_key=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    comments = Column(JSON)
    results = Column(JSON)

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()