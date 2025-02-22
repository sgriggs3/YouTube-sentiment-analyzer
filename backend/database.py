from sqlalchemy import create_engine, Column, String, DateTime, JSON, Integer, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from config import Config

# Use connection pooling for database interactions
engine = create_engine(Config.POSTGRES_URL, pool_size=10, max_overflow=20)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Analysis(Base):
    __tablename__ = "analyses"

    video_id = Column(String, primary_key=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    comments = Column(JSON)
    results = Column(JSON)

class Video(Base):
    __tablename__ = 'videos'
    id = Column(String, primary_key=True)
    title = Column(String)
    published_at = Column(DateTime)
    description = Column(String)
    comments = relationship("Comment", back_populates="video")

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(String, primary_key=True)
    video_id = Column(String)
    text = Column(String)
    sentiment_score = Column(Float)
    video = relationship("Video", back_populates="comments")

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
