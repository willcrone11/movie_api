//imports express and morgan modules
const express = require('express'), 
      morgan = require('morgan');
const app = express();

//logs requests to terminal using morgan
app.use(morgan('common'));

//GET requests
app.get('/', (req, res) => {
  res.send('May the force be with you!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(express.static('public'));

//handles errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});