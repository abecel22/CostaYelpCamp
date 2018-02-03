const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//app config
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose/ model config
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

let Blog = mongoose.model('Blog', blogSchema);

//RESTful Routes
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

//INDEX Route
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs });
        }
    });
});

//NEW ROUTE
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

//CREATE ROUTE
app.post('/blogs', function(req, res) {
    //create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render('new');
        } else {
            //then redirect to the index
            res.redirect('/blogs');
        }
    });
});

app.listen(3000, function() {
    console.log('Server is running!');
});
