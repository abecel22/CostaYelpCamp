const express = require('express');
      app = express();
      bodyParser = require('body-parser');
      mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//     name: 'Granite Hill', 
//     image: 'https://farm6.staticflickr.com/5106/5681900610_fc449a1ac2.jpg',
//     description: 'This is a huge granite hill. No bathrooms. No water. Beautiful Granite!'
//     }, 
//     function(err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('Newly Created Campground: ');
//         console.log(campground);
//     }
// });


app.get('/', function(req, res) {
    res.render('landing');
});

//Index Route - show all campgrounds
app.get('/campgrounds', function(req, res) {
    //get all Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
    
});

//CREATE route- add new campground to DB
app.post('/campgrounds', function(req, res) {
    //get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            //redirect back to backgrounds page
            res.redirect('/campgrounds');
        }
    });
    
});

//NEW Route - Show form to submit new
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

//SHOW Route- show details of one campsite
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground) {
         if(err) {
             console.log(err);
         } else {
            //render show template with that campground 
            res.render("show", {campground: foundCampground});
         }
    });    
});

app.listen(3000, function() {
    console.log('YelpCamp Server Has Started!!');
});