from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from routes.auth_routes import auth_routes, mail
from routes.post_routes import post_routes
from models import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)
mail.init_app(app)
CORS(app)

app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(post_routes, url_prefix="/posts")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
