from datetime import datetime
from app import db  # Changed to import from app.py to avoid circular imports

class User(db.Model):
    __tablename__ = "users"  # Explicit table naming

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)  # Added index
    phone = db.Column(db.String(15), unique=True, nullable=True)  # Made nullable for email-only auth
    password = db.Column(db.String(255), nullable=False)
    otp_verified = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Track user creation time

    # Relationships
    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)  # Added index

    # Relationships
    user = db.relationship("User", back_populates="posts")

    def __repr__(self):
        return f"<Post {self.id} by User {self.user_id}>"
    
class OTP(db.Model):
    __tablename__ = 'otps'
    
    id = db.Column(db.Integer, primary_key=True)
    recipient = db.Column(db.String(100), nullable=False)  # email or phone
    otp_code = db.Column(db.String(10), nullable=False)
    otp_type = db.Column(db.String(10), nullable=False)  # 'email' or 'sms'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)    