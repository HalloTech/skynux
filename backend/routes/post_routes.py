from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Post

post_routes = Blueprint("posts", __name__)

@post_routes.route('/create', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    data = request.json
    new_post = Post(user_id=user_id, content=data['content'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created successfully"}), 201

@post_routes.route('/feed', methods=['GET'])
def get_feed():
    posts = Post.query.all()
    return jsonify([{"user_id": post.user_id, "content": post.content} for post in posts]), 200
