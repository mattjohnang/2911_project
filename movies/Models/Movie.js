var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var movieSchema = mongoose.Schema({
  _id: {
    type: Number,
    min: 1,
    max: 1000000

  },
  movieName: {
    type: String
  }
  
});
movieSchema.plugin(passportLocalMongoose);
var Movie = module.exports = mongoose.model('Movie', movieSchema);
module.exports = Movie;
