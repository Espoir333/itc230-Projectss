'use strict'
const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
const movies = require('./data.js');
const http = require("http"); 

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  let videos=movies.getAll().length
  console.log(videos)
  res.end(`The length is ${videos}`);
 });

 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About page');
 });

 app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
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
 });