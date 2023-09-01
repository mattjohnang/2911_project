var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var reviewSchema = mongoose.Schema({
  username: {
    type: String

  },
  movieName: {
    type: String
  },

  
  stars: {
     type: Number,
     min: 1,
     max: 5
  },
    
  review: {
     type: String
  },

  date: {
    type:String

  },

  movieID:{

    type: String

  }
 
});
reviewSchema.plugin(passportLocalMongoose);
var Review = module.exports = mongoose.model('Review', reviewSchema);
module.exports = Review;
