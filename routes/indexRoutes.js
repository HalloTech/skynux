const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Home Route
router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

//post jobs page
router.get('/post-jobs', (req, res) => {
    res.render('pages/postJobs', { user: req.user });
}); 

//browse jobs page
router.get('/browse-jobs', (req, res) => {
    res.render('pages/browseJob', { user: req.user });
}); 

//browse talent page
router.get('/browse-talents', (req, res) => {
    res.render('pages/browseTalents', { user: req.user });
}); 


//browse jobs page
router.get('/login', (req, res) => {
    res.render('pages/login', { user: req.user });
}); 

//User profile page
router.get('/user-profile', (req, res) => {
    res.render('pages/user', { user: req.user });
}); 

// Dashboard Route (Protected)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = router;
