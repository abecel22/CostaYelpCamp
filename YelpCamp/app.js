const express = require('express');
app = express();
bodyParser = require('body-parser');
mongoose = require('mongoose');
Campground = require('./models/campground');
Comment = require('./models/comment');
seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
seedDB();

app.get('/', function(req, res) {
    res.render('landing');
});

//Index Route - show all campgrounds
app.get('/campgrounds', function(req, res) {
    //get all Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }
    });
});

//CREATE route- add new campground to DB
app.post('/campgrounds', function(req, res) {
    //get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = { name: name, image: image, description: desc };
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to backgrounds page
            res.redirect('/campgrounds');
        }
    });
});

//NEW Route - Show form to submit new
app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new');
});

//SHOW Route- show details of one campsite
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id)
        .populate('comments')
        .exec(function(err, foundCampground) {
            if (err) {
                console.log(err);
            } else {
                console.log(foundCampground);
                //render show template with that campground
                res.render('campgrounds/show', { campground: foundCampground });
            }
        });
});

//==============================================
// COMMENTS ROUTES
//==============================================

app.get('/campgrounds/:id/comments/new', function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //Create comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //Connect new comment to campground
                    campground.comments.push(comment._id);
                    campground.save();
                    //redirect back to campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log('YelpCamp Server Has Started!!');
});
