const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

module.exports = {
    ensureAuthenticated: (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            req.flash('error_msg', 'Access denied. Please log in.');
            return res.redirect('/login');
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
            req.user = decoded; // Attach user data to request
            next();
        } catch (error) {
            req.flash('error_msg', 'Invalid or expired token. Please log in again.');
            res.redirect('/login');
        }
    }
};
