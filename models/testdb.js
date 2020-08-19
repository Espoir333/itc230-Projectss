const Movie = require("./movie/movie");

// return all records
Movie.find({}).lean()
  .then((movies) => {
    console.log(movies);
  })
  .catch(err => next(err));
});