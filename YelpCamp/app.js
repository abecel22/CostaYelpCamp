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
    image: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//     name: 'Granite Hill', 
//     image: 'https://farm6.staticflickr.com/5106/5681900610_fc449a1ac2.jpg'
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

app.get('/campgrounds', function(req, res) {
    //get all Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });
    
});

app.post('/campgrounds', function(req, res) {
    //get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
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

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.listen(3000, function() {
    console.log('YelpCamp Server Has Started!!');
});