'use strict'

//const http = require("http");
//const Movie = require('./model/movies');
//const movies = require('./data.js');
const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars"); 

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");
const movies = require('./data.js');
const http = require("http"); 
app.use(bodyParser.json());

app.get('/home.html', (request, response) => {
  response.type('text/html');
  response.sendFile(__dirname + '/public/home.html');
});

app.get('/', (request, response) => {
  return Movie.find({}).lean()
  .then((movies) => {
    console.log(movies);
    response.render('home_react', {items: JSON.stringify(movies)});
   // response.send(movies)
  })
  //.catch(err => console.log(err));
  .catch(err => next(err));

 // response.render('home', {movies: all});
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
  let director = request.query.director;
  Movie.findOne({"director":director}).lean()
  .then((movie) => {
    response.render('detail', {movie: movie });

      console.log(movie);;
  })
  .catch(err => console.log(err));
  });

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  let videos=movies.getAll().length
  console.log(videos)
  res.end(`The length is ${videos}`);
 });
 //app.get('/', (req, res) => {
  //res.type('text/html')
  //res.render('home', {players : players.getAll()})
 //})

//app.get('/api/delete', (request, response) => {
//  let director = request.query.director;
//Movie.deleteOne({"director":director}).lean()
//.then((movie) => {
 // response.json(movie)
 // console.log(movie);;
//})
//.catch(err => console.log(err));

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

// http.createServer((req,res) => {
//   const path = req.url.toLowerCase();
//   switch(path) {
//     case '/':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       let videos=movies.getAll().length
//       console.log(videos)
//       res.end(`The length is ${videos}`);
//       break;
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('About page');
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not found');
//       break;
//     }
// }) 
app.listen(app.get('port'), () => {
  console.log('Express started'); 
 })