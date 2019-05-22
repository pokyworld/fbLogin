
const express = require('express');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const router = express.Router();

// @route   GET login
// @desc    display login page using views/login-test.html
// @access  Public
router.get('/', (req, res) => {

    const data = {};

    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'login-test.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

// @route   GET login/google
// @desc    display login page using views/google.html
// @access  Public
router.get('/google', (req, res) => {

    const data = {};
    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'google.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

// @route   GET login/facebook
// @desc    display login page using views/facebook.html
// @access  Public
router.get('/facebook', (req, res) => {

    const data = {};
    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'facebook.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

// @route   GET login/twitter
// @desc    display login page using views/twitter.html
// @access  Public
router.get('/twitter', (req, res) => {

    const data = {};
    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'twitter.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

// @route   GET login/linkedin
// @desc    display login page using views/linkedin.html
// @access  Public
router.get('/linkedin', (req, res) => {

    const data = {};
    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'linkedin.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

// @route   GET login/yahoo
// @desc    display login page using views/yahoo.html
// @access  Public
router.get('/yahoo', (req, res) => {

    const data = {};
    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'yahoo.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

// @route   GET login/github
// @desc    display login page using views/github.html
// @access  Public
router.get('/github', (req, res) => {

    const data = {};
    const loadLogin = () => fs.readFileSync(path.join(__dirname, '../views', 'github.html')).toString();
    const template = handlebars.compile(loadLogin());
    res.send(template(data));

});

module.exports = router;

