from datetime import datetime
from app import db  # Changed to import from app.py to avoid circular imports

class User(db.Model):
    __tablename__ = "users"  # Explicit table naming

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False, index=True)  # Added username field
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)  # Added index
    password = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(20), nullable=False)  # 'freelancer' or 'recruiter'
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
