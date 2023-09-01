const Movie = require('../Models/Movie');

class MovieRepo {
    
    // This is the constructor.
    MovieRepo() {        
    }

    // Gets all movies.
    async allMovies() {     
        let movies = await Movie.find().exec();
        return   movies;
    }


    async getMovie(id) { 
        parseInt(id) 
        let movie = await Movie.findOne({_id:id}).exec();
        console.log(movie, "get movie")
        return   movie;
    }

    async create(movieObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await movieObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          movieObj,
                    errorMessage: error.message };
                            
                    console.log(JSON.stringify(error));
                    
                return response; // Exit if the model is invalid.
            } 
                


            // Model is not invalid so save it.
            const result = await movieObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
                
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          movieObj,
                errorMessage: err.message };
                
            return  response;
        }    
        
        
    
    } 
}
    module.exports = MovieRepo;