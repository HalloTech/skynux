import os

class Config:
    SECRET_KEY = "your_secret_key"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://username:password@localhost/freelancer_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "your_jwt_secret"
    
    # Email Configuration for OTP
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = "your_email@gmail.com"
    MAIL_PASSWORD = "your_email_password"

    # Twilio Configuration for OTP (optional)
    TWILIO_ACCOUNT_SID = "your_twilio_sid"
    TWILIO_AUTH_TOKEN = "your_twilio_auth_token"
    TWILIO_PHONE_NUMBER = "your_twilio_number"
