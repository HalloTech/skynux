import random
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_mail import Message
from models import User
from app import db, mail
from config import Config

auth_routes = Blueprint("auth", __name__)

# OTP Storage (Temporary - use Redis in production)
otp_storage = {}

def generate_otp():
    return str(random.randint(100000, 999999))

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ['name', 'email', 'phone', 'password']):
        return jsonify({"message": "Missing required fields"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 409

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        password=hashed_password
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    otp = generate_otp()
    otp_storage[data['email']] = otp  # Store OTP temporarily
    
    msg = Message(
        "Your Verification OTP",
        sender=Config.MAIL_USERNAME,
        recipients=[data['email']]
    )
    msg.body = f"Your OTP code is: {otp}"
    mail.send(msg)
    
    return jsonify({
        "message": "User registered. OTP sent to email",
        "user_id": new_user.id
    }), 201

@auth_routes.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if not user or data.get('otp') != otp_storage.get(data['email']):
        return jsonify({"message": "Invalid OTP"}), 400
    
    user.otp_verified = True
    db.session.commit()
    otp_storage