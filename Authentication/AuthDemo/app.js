const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/auth_demo_app');
const app = express();
app.set('view engine', 'ejs');

app.use(
    require('express-session')({
        secret: 'Rusty is the best and cutest dog in the world',
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000, function() {
    console.log('Server started.....');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});
