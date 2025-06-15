from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions with app
    db.init_app(app)
    jwt.init_app(app)
    
    # Configure CORS to allow frontend requests
    cors.init_app(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000", "http://localhost:3001"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "expose_headers": ["Content-Type", "Authorization"]
        }
    })
    
    migrate.init_app(app, db)

    # Register blueprints
    from routes.auth_routes import auth_routes
    from routes.post_routes import post_routes
    
    app.register_blueprint(auth_routes, url_prefix="/auth")
    app.register_blueprint(post_routes, url_prefix="/posts")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
