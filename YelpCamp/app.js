const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    let campgrounds = [
        {name: 'Salmon Creek', image: 'https://farm9.staticflickr.com/8020/7538732802_49a42d28d2.jpg'},
        {name: 'Granite Hill', image: 'https://farm6.staticflickr.com/5106/5681900610_fc449a1ac2.jpg'},
        {name: 'Mountain Goat"s Rest', image: 'https://farm5.staticflickr.com/4117/4741325076_2d2b5d70dc.jpg'}
    ]
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, function() {
    console.log('YelpCamp Server Has Started!!');
});