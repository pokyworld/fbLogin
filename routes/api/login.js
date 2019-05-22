const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   GET api/login/test
// @desc    Tests login route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Login API Works' }));

// @route   POST api/login/facebook
// @desc    Login with FB token
// @access  Public
router.post('/facebook', (req, res) => {
    console.log(req.body);
    const { name, email, fbToken } = req.body;
    // 1. Verify the FB token with FB ??
    // 2. Check if user with supplied email exists
    // 3. If not, create user
    // 4. Login into server and return JWT

    const user = { _id: 1, name, email }

    const jwToken = jwt
        .sign(
            { _id: user._id, name: user.name, email: user.email },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );

    const result = {
        success: true,
        message: "FB Token has been verified",
        user: { name, email },
        jwToken
    }
    res.json(result);
});


module.exports = router;