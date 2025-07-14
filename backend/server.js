const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { initializeModels } = require('./models/index');

// Import routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: config.CORS_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    database: 'MySQL'
  });
});

// API routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
  
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      message: 'Duplicate entry',
      field: error.errors[0].path
    });
  }

  if (error.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      message: 'Database connection error',
      error: 'Unable to connect to database'
    });
  }
  
  res.status(500).json({ 
    message: 'Internal server error',
    ...(config.NODE_ENV === 'development' && { error: error.message })
  });
});

// Start server
const startServer = async () => {
  try {
    // Initialize models and database
    await initializeModels();
    
    // Start listening
    const PORT = config.PORT;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${config.NODE_ENV}`);
      console.log(`🗄️  Database: MySQL`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer(); 