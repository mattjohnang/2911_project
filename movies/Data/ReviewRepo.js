const Review = require('../Models/Review');
const mongoose = require('mongoose');


class ReviewRepo {
    
    // This is the constructor.
    ReviewRepo() {        
    }

    // Gets all products.
    async allReviews(movieName) {     
        let reviews = await Review.find().exec();
        let arr =[];
        for (let i = 0; i<reviews.length; i++){
            if (reviews[i].movieName == movieName) {
                arr.push(reviews[i])
            }
        }

        return   arr;
    }

    async allReview() {     
        let review = await Review.find().exec();
        return review;
    }


    async getReview(id) {  
        let review = await Review.findOne({_id:id}).exec();
        return   review;
    }

    async create(reviewObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await reviewObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          reviewObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await reviewObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          reviewObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 
    

    async update(editedObj) {   
    
        // Set up response object which contains origianl product object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };

    
        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            let reviewObject = await this.getReview(editedObj);


            // Check if product exists.
            if(reviewObject) {
                // Product exists so update it.
                let updated = await Review.updateOne(
                    {_id: editedObj._id}, // Match id.
                    
                    
                    
                    // Set new attribute values here.
                    {$set: {username: editedObj.username,
                        movieName: editedObj.movieName,
                        stars: editedObj.stars,
                        review: editedObj.review,
                        movieID: editedObj.movieID,
                        
                        }}); 
                        console.log(updated, "updated")

                // No errors during update.
                if(updated.nModified!=0) {
                    
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
                
            // Product not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
    
                    // An error occurred during the update. 
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  

    
    async deleteReview(id) {
        let obj = mongoose.Types.ObjectId(id)
        await Review.deleteOne({_id: obj}, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('review deleted.')
            }
        })
    }
    
}


module.exports = ReviewRepo;
