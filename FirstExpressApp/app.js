var express = require('express');
var app = express();

// '/' => 'Hi there!'
app.get('/', function(req, res){
    res.send('Hi there!');
});
// '/bye' => 'Goodbye!!'
app.get('/bye', function(req, res) {
    res.send('Goodbye!!');
});
// '/dog' => 'Ruff!'
app.get('/dog', function(req, res) {
    console.log('Someone Made a request to /dog!')
    res.send('Ruff!!');
});

app.get('/r/:subredditName', function(req, res) {
    let subreddit = req.params.subredditName;
    res.send('Welcome to the ' + subreddit + ' subreddit!!');
});

app.get('/r/:subredditName/comments/:id/:title', function(req, res) {
    console.log(req.params);
    res.send('Welcome to the comments!!');
});

app.get('*', function(req, res) {
    res.send('You are a Star!!');
});

// Tell Express to listen for requests (start server)

app.listen(3000, function() {
    console.log('Server has started!');
});