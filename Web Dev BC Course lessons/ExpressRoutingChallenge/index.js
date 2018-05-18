const express = require('express');
const app = express();

// Visiting '/' should have welcome message.
app.get('/', function(req, res) {
    res.send('Hi there, welcome to my asignment!');
});

// Visiting '/speak/:animal' should have an equal animal sound.
app.get('/speak/:animal', function(req, res) {
    let animal = req.params.animal;
    const sounds = {
        pig: 'Oink!',
        dog: 'Woof Woof!',
        cow: 'Moo!',
        lion: 'Roar!',
        duck: 'Quack Quak!'
    }
    let sound = sounds[animal];
    res.send(`The ${animal} says "${sound}"`);
});

//Visiting '/repeat/:word/:number' will repeat word that many times.
app.get('/repeat/:word/:number', function(req, res) {
    let word = req.params.word;
    let num = Number(req.params.number);
    let repeatedWords = '';
    for(let i = 0; i < num; i++) {
        repeatedWords += ' ' + word;
    }
    res.send(repeatedWords);
});

app.get('*', function(req, res) {
    res.send('Sorry, page not found...What are you doing with your life?');
});

//tell express to listen for requests.
app.listen(3000, function() {
    console.log('Server has started!');
}); 