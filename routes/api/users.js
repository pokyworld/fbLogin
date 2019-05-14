const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Get All Users
// @access  Public
const users = [];
router.get('/', (req, res) => res.json(users));

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;