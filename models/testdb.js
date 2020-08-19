const Movie = require("./movie/movie");

// return all records
Artist.find({}).lean()
  .then((movies) => {
    console.log(artists);
  })
  .catch(err => next(err));
});