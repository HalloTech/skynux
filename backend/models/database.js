const { Sequelize } = require('sequelize');
const config = require('../config');

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(
  config.DATABASE.database,
  config.DATABASE.username,
  config.DATABASE.password,
  {
    host: config.DATABASE.host,
    port: config.DATABASE.port,
    dialect: config.DATABASE.dialect,
    logging: config.DATABASE.logging,
    pool: config.DATABASE.pool,
    define: {
      timestamps: false, // Disable timestamps by default
      underscored: true, // Use snake_case for column names
      freezeTableName: true // Use exact table names
    }
  }
);

// Database initialization function
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    await sequelize.sync({ force: false }); // Set force: true to recreate tables
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  initializeDatabase
}; 