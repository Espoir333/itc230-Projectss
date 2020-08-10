const Movie = require("../model/movies")

Movie.find({}).lean()
    .then((movies) => {
        console.log(movies);
    })    
.catch(err => console.log(err));
//Book.find({}).lean()
 