  // to assign value =
// to compare values ==
// to compare values stricktly ===

let videos =[
    {title: "titanic", director:"James Cameron", genre: "romance", released:1997},
    {title: "mission impossible", director:"Brian De Palma", genre: "action", release:1996},
    {title: "The Seven Samurai", director:"Akira Kurosawa", genre: "action", release:1954},
    {title: "Bonnie and Clyde", director: "Arthur Penn", genre: "romance", release:1967},
    {title: "Reservoir Dogs", director: "Quentin Tarantino", genre: "drama", release:1992},
];

exports.getAll = () => {
    return movies;
};

exports.getmovies = (title) => {
    return movies.find((movies) => {
      return movies.title === title;
    });
  }
exports.delete = (title) => {
    const oldLength = movies.length;
    movies = movies.filter((item) => {
        return item.title !== title;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== movies.length, total: movies.length };
}; 
exports.add = (newmovie) => {
  const oldLength = movies.length;
  // use existing get() method to check if movies already in our list
  let found = this.getmovies(newmovie.title);
  if (!found) {
      movies.push(newmovie);
  }
  // if old & new array lengths differ, item was added
  return {added: oldLength !== movies.length, total: movies.length };
};