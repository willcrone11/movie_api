//imports express, morgan, body parser, uuid, mongoose, and Models modules
const express = require('express'), 
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      mongoose = require('mongoose'),
      Models = require('./models.js');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

//refers to Movies and User models from db collections
const Movies = Models.Movie;
const Users = Models.User;

//connects mongoose to myFlix db
mongoose.connect('mongodb://localhost:27017/test',
{ useNewUrlParser: true, useUnifiedTopology: true });

//logs requests to terminal using morgan
app.use(morgan('common'));


//GET requests
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

//gets list of all movies
app.get('/movies', (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//gets info on one specific movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//gets info on a genre by title
app.get('/movies/Genres/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//gets info on a director by name
app.get('/movies/Directors/:Name', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST requests:
//Allow new users to register
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Allow users to add a movie to their list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    res.send('A successful PUT request updating a users list of favorites');
});

//PUT requests
//Allow users to update their user information
app.put('/users/:Username', (req, res) => {
    res.send('A successful PUT request updating user information');
});

//DELETE requests
//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    res.send('A successful DELETE request removing a movie from users list of favorites');
});

//Allow existing users to deregister
app.delete('/users/:Username', (req, res) => {
    res.send('A successful DELETE request that deregisters the user');
});

//handles errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});