from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_mail import Mail, Message
from twilio.rest import Client
from models import db, User
from config import Config

auth_routes = Blueprint("auth", __name__)
mail = Mail()
twilio_client = Client(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 400
    
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(name=data['name'], email=data['email'], phone=data['phone'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    send_email_otp(data['email'])
    return jsonify({"message": "User registered, verify OTP sent to email"}), 201

def send_email_otp(email):
    otp = "123456"  # You should generate a random OTP here
    msg = Message("Your OTP Code", sender=Config.MAIL_USERNAME, recipients=[email])
    msg.body = f"Your OTP is {otp}"
    mail.send(msg)

@auth_routes.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and data['otp'] == "123456":  # Replace with real OTP verification logic
        user.otp_verified = True
        db.session.commit()
        return jsonify({"message": "OTP Verified!"}), 200
    return jsonify({"message": "Invalid OTP"}), 400

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token}), 200
    return jsonify({"message": "Invalid credentials"}), 401
