//imports express, morgan, body parser, and uuid modules
const express = require('express'), 
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

//logs requests to terminal using morgan
app.use(morgan('common'));

let topMovies = [
    {
        Title: 'Star Star Wars Episode IV – A New Hope',
        Director: 'George Lucas',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode V – The Empire Strikes Back',
        Director: 'Irvin Kershner',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode VI – Return of the Jedi',
        Director: 'Richard Marquand',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode I – The Phantom Menace',
        Director: 'George Lucas',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode II – Attack of the Clones',
        Director: 'George Lucas',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode III – Revenge of the Sith',
        Director: 'George Lucas',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode VII – The Force Awakens',
        Director: 'J. J. Abrams',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode VIII – The Last Jedi',
        Director: 'Rian Johnson',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Star Wars Episode IX – The Rise of Skywalker',
        Director: 'J. J. Abrams',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Rogue One',
        Director: 'Gareth Edwards',
        Genres: 'Science Fiction'
    },
    {
        Title: 'Solo',
        Director: 'Ron Howard',
        Genres: 'Science Fiction'
    }
];

//GET requests
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});

//gets list of all movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//gets info on one specific movie by title
app.get('/movies/:Title', (req, res) => {
  res.json(topMovies.find((movie) => { 
    return movie.Title === req.params.Title }));
});

//gets info on a genre by title
app.get('/movies/Genres/:Title', (req, res) => {
  res.send('A successful GET request returning information on a genre by title');
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