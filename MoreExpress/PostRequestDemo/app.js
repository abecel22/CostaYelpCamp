const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let friends = ['Roderick', 'Ashley', 'Cesar', 'Orlando'];

app.get('/', function(req, res) {
    res.render('home');
});

//post route
app.post('/addfriend', function(req, res) {
    let newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect('/friends');
});

//friends list
app.get('/friends', function(req, res) {
    res.render('friends', {friends : friends});
});

app.listen('3000', function() {
    console.log('Server Started!')
});