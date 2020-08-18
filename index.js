'use strict'

const Movie = require('./models/movies');
const http = require("http");
const movies = require('./data.js');
const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars"); 

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.type('text/html')
  Movie.find({}).lean()
  .then((movies) => {
   // console.log(movies);
   res.render('home', {movies: movies})
  })
 .catch(err => console.log(err));
 });
app.get('/api/movies', (request, response) => {
  return Movie.find({}).lean()
  .then((movies) => {
   // console.log(movies);
   // response.send(movies)
  })
 .catch(err => console.log(err));
 // response.render('home', {movies: all});
});

app.get('/detail', (request, response) => {
  let title= request.query.title;
  //let movie=movies.getmovie(title)
  Movie.findOne({"title":title}).lean()
.then((movie) => {
  response.render('detail', {movie: movie})
 });
});

app.get('api/movies/:title', (request, response) => {
  let title = request.params.title;
    //let movie = all[index];
   
  Movie.findOne({"title":title}).lean()
  .then((movie) => {
    response.json(movie)
    console.log(movie);;
  })
  .catch(err => console.log(err));
  })

// insert or update a single record 
app.post('/api/add', (request, response) => {
  const newMovie= request.body;
  Movie.update({'title':newMovie.title}, newMovie, {upsert:true}, (err, result) => {
    if (err) return next(err);
    response.json(result)
    console.log(result);
  });
  });

app.get('/api/delete', (request, response) => {
  let title = request.query.title;
Movie.deleteOne({"title":title}).lean()
.then((movie) => {
  response.json(movie)
  //console.log(movie);;
})
.catch(err => console.log(err));
});

  //let movie = all[index];
  //response.render('detail', { index: index, movie: movie });

// send plain text response
 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About page');
 });

 // custom 404 page
 app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  console.log('Got 404 - Not Found request.');
  res.send('404 - Not found');
 });
app.listen(app.get('port'), () => {
  console.log('Express started'); 
 })