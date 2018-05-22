const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

//Index Route - show all campgrounds
router.get('/campgrounds', function(req, res) {
    //get all Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            //req.user gets created by passport
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });
});

//CREATE route- add new campground to DB
router.post('/campgrounds', middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    var cost = req.body.cost;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };

    geocoder.geocode(req.body.location, function(err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }

        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {
            name: name,
            image: image,
            cost: cost,
            description: desc,
            author: author,
            location: location,
            lat: lat,
            lng: lng
        };
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
});

//NEW Route - Show form to submit new
router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

//SHOW Route- show details of one campsite
router.get('/campgrounds/:id', function(req, res) {
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

//edit campground routes

router.get(
    '/campgrounds/:id/edit',
    middleware.checkCampgroundOwnership,
    function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            res.render('campgrounds/edit', {
                campground: foundCampground
            });
        });
    }
);

//update campground route
router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, function(
    req,
    res
) {
    geocoder.geocode(req.body.location, function(err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formatted_address;
        var newData = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            cost: req.body.cost,
            location: location,
            lat: lat,
            lng: lng
        };
        Campground.findByIdAndUpdate(req.params.id, { $set: newData }, function(
            err,
            campground
        ) {
            if (err) {
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                req.flash('success', 'Successfully Updated!');
                res.redirect('/campgrounds/' + campground._id);
            }
        });
    });
});

//Destroy Campground route
router.delete('/campgrounds/:id', middleware.checkCampgroundOwnership, function(
    req,
    res
) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;
