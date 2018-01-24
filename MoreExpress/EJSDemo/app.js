const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.render('home.ejs'); 
})

//fallinlovewith/rusty 
app.get('/fallinlovewith/:thing', function(req, res) {
    let thing = req.params.thing;
    res.render('love.ejs', {thingVar: thing});
});


app.listen(3000, function(req, res) {
    console.log('Server is listening!');
});