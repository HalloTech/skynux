# Skynux Backend API

A Node.js/Express.js backend API for the Skynux platform, providing authentication, user management, and post functionality.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: User registration, login, and profile management
- **Posts**: Create, read, update, and delete posts
- **OTP System**: Email and SMS OTP verification using Nodemailer and Twilio
- **Database**: MySQL database with Sequelize ORM
- **Security**: Helmet, rate limiting, CORS, and input validation
- **Error Handling**: Comprehensive error handling and validation
- **Modular Architecture**: Separate model files for better organization

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **SMS**: Twilio
- **Validation**: express-validator
- **Security**: Helmet, express-rate-limit

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server (v8.0 or higher)

## Installation

1. **Clone the repository and navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MySQL database:**
   ```sql
   CREATE DATABASE skynux_db;
   CREATE USER 'skynux_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON skynux_db.* TO 'skynux_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   SECRET_KEY=your-secret-key-here
   JWT_SECRET=your-jwt-secret-here
   
   # MySQL Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=skynux_user
   DB_PASSWORD=your_password
   DB_NAME=skynux_db
   
   # Email Configuration (optional)
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   
   # Twilio Configuration (optional)
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=your-twilio-phone-number
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## Project Structure

```
backend/
├── models/
│   ├── database.js      # Database connection configuration
│   ├── User.js          # User model
│   ├── Post.js          # Post model
│   ├── OTP.js           # OTP model
│   ├── associations.js  # Model relationships
│   └── index.js         # Models export
├── routes/
│   ├── auth.js          # Authentication routes
│   └── posts.js         # Post routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── utils/
│   └── otp.js           # OTP utility functions
├── config.js            # Application configuration
├── server.js            # Main server file
└── package.json
```

## API Endpoints

### Authentication Routes (`/auth`)

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/users` - Get all users (for admin purposes)
- `POST /auth/send-email-otp` - Send email OTP
- `POST /auth/send-sms-otp` - Send SMS OTP
- `POST /auth/verify-otp` - Verify OTP

### Post Routes (`/posts`)

- `GET /posts` - Get all posts (feed)
- `POST /posts` - Create a new post
- `GET /posts/:postId` - Get a specific post
- `PUT /posts/:postId` - Update a post
- `DELETE /posts/:postId` - Delete a post
- `GET /posts/user/:userId` - Get posts by user

### Health Check

- `GET /health` - Server health check

## Database Models

### User
- `id` (Primary Key, Auto Increment)
- `name` (String, 100 chars)
- `username` (String, 50 chars, Unique)
- `email` (String, 100 chars, Unique)
- `password` (String, 255 chars, Hashed)
- `category` (Enum: 'freelancer' | 'recruiter')
- `created_at` (DateTime)
- `updated_at` (DateTime)

### Post
- `id` (Primary Key, Auto Increment)
- `user_id` (Foreign Key to User)
- `content` (Text, Max 10,000 chars)
- `created_at` (DateTime)
- `updated_at` (DateTime)

### OTP
- `id` (Primary Key, Auto Increment)
- `recipient` (String, 255 chars)
- `otp_code` (String, 4-10 chars)
- `otp_type` (Enum: 'email' | 'sms')
- `expires_at` (DateTime)
- `created_at` (DateTime)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "field_name",
      "message": "Validation error message"
    }
  ]
}
```

## Security Features

- **Helmet**: Security headers
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origins
- **Input Validation**: Using express-validator
- **Password Hashing**: bcryptjs with salt rounds
- **JWT**: Secure token-based authentication
- **SQL Injection Protection**: Sequelize ORM with parameterized queries

## Development

### Running Tests
```bash
npm test
```

### Database Migrations
The database is automatically created and synchronized when the server starts. For production, consider using proper migrations.

### Environment Variables
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `SECRET_KEY`: Application secret key
- `JWT_SECRET`: JWT signing secret
- `DB_HOST`: MySQL host (default: localhost)
- `DB_PORT`: MySQL port (default: 3306)
- `DB_USERNAME`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name
- `MAIL_*`: Email configuration for OTP
- `TWILIO_*`: Twilio configuration for SMS OTP

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 