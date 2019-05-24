const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');
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

    jwt
        .sign(
            { _id: user._id, name: user.name, email: user.email },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({
                    success: true,
                    message: "FB Token has been verified",
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
});

// @route   POST api/login/github
// @desc    Login with GH Session Code
// @access  Public
router.post('/github', (req, res) => {
    // console.log(req.body);
    const { code } = req.body;
    // 1. Obtain Access Token from Github
    // 2. Use Access Token to find email
    // 3. Check if user with supplied email exists
    // 4. If not, create user
    // 5. Login into server and return JWT

    //TODO: Get Access Token

    const ghConfig = config.get("github");
    const body = JSON.stringify({
        client_id: ghConfig.appId,
        client_secret: ghConfig.appSecret,
        code,
        accept: "json"
    });
    console.log(body);

    fetch(config.get("github").url.accessToken, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body, // Coordinate the body type with 'Content-Type'
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            const accessToken = json.access_token;

            // Now get user public profile
            const url = config.get("github").url.getUser;
            const params = `access_token=${accessToken}&accept=json`;

            fetch(`${url}?${params}`, {
                credentials: 'same-origin', // 'include', default: 'omit'
                method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
                headers: {
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    const { login, email, name } = json;

                    if (!email) {
                        res.json({ success: false, message: "No email stored on this account" });
                    } else {
                        // Check if user exists
                        const user = { _id: 1, login, email, name: name || login };

                        // or Create user

                        // Generate JWT
                        jwt
                            .sign(
                                { _id: user._id, name: user.name, email: user.email },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;

                                    res.json({
                                        success: true,
                                        message: "GH Token has been verified",
                                        token,
                                        user: {
                                            _id: user._id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            );
                    }
                })
                .catch(err => console.log("Error : ", err));

        })
        .catch(err => console.log("Error : ", err));

});

module.exports = router;