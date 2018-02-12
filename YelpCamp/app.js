const express = require('express');
app = express();
bodyParser = require('body-parser');
mongoose = require('mongoose');
passport = require('passport');
LocalStrategy = require('passport-local');
methodOverride = require('method-override');
Campground = require('./models/campground');
Comment = require('./models/comment');
User = require('./models/user');
seedDB = require('./seeds');

//requiring routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// seed the detabase
// seedDB();

//Passport configuration
app.use(
    require('express-session')({
        secret: 'Rusty is a dog',
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to call on every route to check for user signed in
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function() {
    console.log('YelpCamp Server Has Started!!');
});
