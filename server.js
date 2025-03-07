const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const path = require('path');

dotenv.config();
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/', indexRoutes);  // Route to render EJS frontend

// Sync database
sequelize.sync()
    .then(() => console.log('✅ Database Synced'))
    .catch(err => console.error('❌ Database Sync Error:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
