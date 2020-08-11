
const mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
 const connectionString = "mongodb+srv://espoir3333:makiese333@cluster0-1u8z0.mongodb.net/scc-dbprooject?retryWrites=true&w=majority"

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(connectionString, { dbName: "scc-dbprooject", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 director: String,
 type:String,
 year: Number
}); 
module.exports = mongoose.model('Movie', mySchema);