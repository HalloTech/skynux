require('dotenv').config();

const config = {
  // Security
  SECRET_KEY: process.env.SECRET_KEY || "dev-secret-key-123",
  JWT_SECRET: process.env.JWT_SECRET || "jwt-secret-key-123",
  
  // Database - MySQL Configuration
  DATABASE: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'htsdb',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  
  // JWT Configuration
  JWT_EXPIRES_IN: '1h',
  
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Email Configuration
  MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
  MAIL_PORT: process.env.MAIL_PORT || 587,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  
  // Twilio Configuration
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  
  // CORS Configuration
  CORS_ORIGINS: ['http://localhost:3000', 'http://localhost:3001'],
  
  // OTP Configuration
  OTP_EXPIRY_MINUTES: 5
};

module.exports = config; 