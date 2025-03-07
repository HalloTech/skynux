require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

// Ensure all required env variables are loaded
const {
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_DIALECT
} = process.env;

if (!DATABASE_DIALECT) {
    console.error('❌ DATABASE_DIALECT is not set in .env file');
    process.exit(1); // Stop the server if dialect is missing
}

// Initialize Sequelize
const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: DATABASE_DIALECT, // Use dialect from .env
        logging: false, // Set to true for debugging SQL queries
    }
);

// Test Database Connection
sequelize.authenticate()
    .then(() => console.log('✅ MySQL Database Connected'))
    .catch(err => console.error('❌ Error connecting to database:', err));

module.exports = sequelize;
