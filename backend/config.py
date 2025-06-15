import os
from dotenv import load_dotenv
import pymysql

# MySQL support via pymysql
pymysql.install_as_MySQLdb()

# Load environment variables from .env
load_dotenv()

class Config:
    # Security
    SECRET_KEY = "dev-secret-key-123"  # Changed to a fixed value for development
    JWT_SECRET_KEY = "jwt-secret-key-123"  # Changed to a fixed value for development

    # Database - Using SQLite by default
    SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour

    # Flask configuration
    DEBUG = True
