  const expect = require("chai").expect;
const movies = require("../data");
// describe("movies module", () => {
 it("returns requested movies", () => {
   const result = movies.getmovies("titanic");
   expect(result).to.deep.equal({title: "titanic", director:"James Cameron", genre:"romance", year:1997});
 });
 
 it("fails w/ invalid movies", () => {
   const result =movies.getmovies("fake");
   expect(result).to.be.undefined;
 });