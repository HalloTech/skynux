import random
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import User
from app import db

auth_routes = Blueprint("auth", __name__)

@auth_routes.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        users_data = []

        for user in users:
            users_data.append({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'category': user.category,
                'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else None
            })

        return jsonify(users_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    required_fields = ['name', 'username', 'email', 'password', 'category']
    if not data or not all(k in data for k in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    if data['category'] not in ['freelancer', 'recruiter']:
        return jsonify({"message": "Invalid category. Must be 'freelancer' or 'recruiter'."}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 409
        
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already taken"}), 409

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        name=data['name'],
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        category=data['category']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user_id": new_user.id,
        "username": new_user.username,
        "email": new_user.email
    }), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        login_identifier = data.get('login')  # Can be either email or username
        password = data.get('password')

        if not login_identifier or not password:
            return jsonify({"message": "Missing login credentials"}), 400

        # Try to find user by email or username
        user = User.query.filter((User.email == login_identifier) | 
                               (User.username == login_identifier)).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"message": "Invalid credentials"}), 401

        access_token = create_access_token(identity=user.id)

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "username": user.username,
                "email": user.email,
                "category": user.category
            }
        }), 200

    except Exception as e:
        return jsonify({"message": "Internal server error"}), 500
