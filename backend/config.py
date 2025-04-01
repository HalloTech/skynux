import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key-for-dev-only")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)  # Default to SECRET_KEY if not set

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")  # Fallback to SQLite
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable Flask-SQLAlchemy event system

    # Email (Flask-Mail)
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True").lower() in ("true", "1", "t")
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_USERNAME")  # For password reset emails

    # Twilio (Optional)
    TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
    TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
    TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

    # Flask-JWT-Extended
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))  # 1 hour default