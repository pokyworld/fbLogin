
const express = require('express');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const router = express.Router();

// @route   GET api/login/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Login Works' }));

// @route   GET login
// @desc    Tests profile route
// @access  Public
router.get('/', (req, res) => {

    const data = {
        // appId: fb.app_id,
        // csrf: fb.csrf_guid,
        // version: fb.api_version
    };

    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'login-test.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

router.post('/login_success', (req, res) => {
    console.log(fb);

    // CSRF check
    if (req.body.csrf === fb.csrf_guid) {
        fb.app_access_token = ['AA', fb.app_id, fb.app_secret].join('|');
        fb.params = {
            grant_type: 'authorization_code',
            code: req.body.code,
            access_token: fb.app_access_token
        };

        // exchange tokens
        const token_exchange_url = fb.token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({ url: token_exchange_url, json: true }, (err, res, body) => {
            const data = {
                user_access_token: body.access_token,
                expires_at: body.expires_at,
                user_id: body.id,
            };

            // get account details at /me endpoint
            const me_endpoint_url = fb.me_endpoint_base_url + '?access_token=' + body.access_token;
            Request.get({ url: me_endpoint_url, json: true }, (err, res, body) => {
                // send login_success.html
                if (body.phone) {
                    data.phone_num = body.phone.number;
                } else if (body.email) {
                    data.email_addr = body.email.address;
                }

                const loadLogin = () => {
                    const template = fs.readFileSync(path.join(__dirname, '../views', 'loginSuccess.html')).toString();
                    // console.log(template);
                    return template;
                };
                const template = handlebars.compile(loadLoginSuccess());
                const html = template(data);
                res.send(html);
            });
        });
    }
    else {
        // login failed
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end("Something went wrong. :( ");
    }
});

module.exports = router;

