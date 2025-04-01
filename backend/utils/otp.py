import random
import string
from datetime import datetime, timedelta
from flask_mail import Message
from twilio.rest import Client
from config import Config
from app import mail, db
from models import OTP  # We'll need to add this model

class OTPManager:
    def __init__(self):
        self.mail = mail
        self.twilio_client = Client(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN)
        self.otp_expiry_minutes = 5  # OTP validity period

    def generate_otp(self, length=6):
        """Generate a random numeric OTP"""
        return ''.join(random.choice(string.digits) for _ in range(length))

    def send_email_otp(self, email):
        """Send OTP via email"""
        otp_code = self.generate_otp()
        expiration = datetime.utcnow() + timedelta(minutes=self.otp_expiry_minutes)

        # Store in database
        otp_record = OTP(
            recipient=email,
            otp_code=otp_code,
            otp_type='email',
            expires_at=expiration
        )
        db.session.add(otp_record)
        db.session.commit()

        # Send email
        msg = Message(
            subject="Your Verification Code",
            sender=Config.MAIL_USERNAME,
            recipients=[email]
        )
        msg.body = f"Your verification code is: {otp_code}\nThis code expires in {self.otp_expiry_minutes} minutes."
        
        try:
            self.mail.send(msg)
            return True
        except Exception as e:
            db.session.delete(otp_record)
            db.session.commit()
            return False

    def send_sms_otp(self, phone_number):
        """Send OTP via SMS using Twilio"""
        if not Config.TWILIO_ACCOUNT_SID:
            return False

        otp_code = self.generate_otp()
        expiration = datetime.utcnow() + timedelta(minutes=self.otp_expiry_minutes)

        # Store in database
        otp_record = OTP(
            recipient=phone_number,
            otp_code=otp_code,
            otp_type='sms',
            expires_at=expiration
        )
        db.session.add(otp_record)
        db.session.commit()

        # Send SMS
        try:
            message = self.twilio_client.messages.create(
                body=f"Your verification code is: {otp_code}",
                from_=Config.TWILIO_PHONE_NUMBER,
                to=phone_number
            )
            return True
        except Exception as e:
            db.session.delete(otp_record)
            db.session.commit()
            return False

    def verify_otp(self, recipient, otp_code):
        """Verify OTP from database"""
        otp_record = OTP.query.filter_by(
            recipient=recipient,
            otp_code=otp_code
        ).first()

        if not otp_record:
            return False

        if otp_record.expires_at < datetime.utcnow():
            db.session.delete(otp_record)
            db.session.commit()
            return False

        # Clean up used OTP
        db.session.delete(otp_record)
        db.session.commit()
        return True

    def cleanup_expired_otps(self):
        """Clean up expired OTPs from database"""
        expired = OTP.query.filter(OTP.expires_at < datetime.utcnow()).all()
        for otp in expired:
            db.session.delete(otp)
        db.session.commit()
        return len(expired)