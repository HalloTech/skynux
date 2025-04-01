import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

load_dotenv()

db = SQLAlchemy()

def init_db(app):
    """Initialize database with the Flask app"""
    app.config['SQLALCHEMY_DATABASE_URI'] = (
        f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'pool_recycle': 3600
    }
    
    db.init_app(app)
    
    try:
        with app.app_context():
            db.create_all()
            print("✅ Database connected successfully!")
    except Exception as e:
        print(f"❌ Database connection error: {str(e)}")
        raise