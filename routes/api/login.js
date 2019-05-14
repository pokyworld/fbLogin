const express = require('express');
const router = express.Router();

// @route   GET api/login/test
// @desc    Tests login route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Login API Works' }));

// @route   POST api/login/facebook
// @desc    Login with FB token
// @access  Public
router.post('/facebook', (req, res) => {
    // 1. Verify the FB token with FB ??
    // 2. Check if user with supplied email exists
    // 3. If not, create user
    // 4. Login into server and return JWT
    res.status(204);
});


module.exports = router;