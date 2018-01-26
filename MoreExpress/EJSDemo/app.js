const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home'); 
})

//fallinlovewith/bruno (my dog) 
app.get('/fallinlovewith/:thing', function(req, res) {
    let thing = req.params.thing;
    res.render('love', {thingVar: thing});
});

app.get('/posts', function(req, res) {
    let posts = [
        {title: 'Bruno the Puppy' , author: 'Cely'},
        {title: 'My Adorable Pet Turtle', author: 'Gabs'},
        {title: 'Can You Believe This Pig?', author: 'Sofs'}
    ]
    res.render('posts', {posts: posts});
});

app.listen(3000, function(req, res) {
    console.log('Server is listening!');
});