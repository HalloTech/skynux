from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Post
from app import db
from datetime import datetime

post_routes = Blueprint("posts", __name__)

@post_routes.route('/', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({"message": "Content is required"}), 400
    
    new_post = Post(
        user_id=user_id,
        content=data['content']
    )
    
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify({
        "message": "Post created successfully",
        "post_id": new_post.id
    }), 201

@post_routes.route('/', methods=['GET'])
@jwt_required()
def get_feed():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    
    return jsonify([{
        "id": post.id,
        "user_id": post.user_id,
        "content": post.content,
        "created_at": post.created_at.isoformat()
    } for post in posts]), 200