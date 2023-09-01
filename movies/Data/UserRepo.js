const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async getUserByEmail(email) {
        var user = await User.findOne({email: email});
        if(user) {
            console.log(user)
            let respose = { obj: user, errorMessage:"" }
            return user;
        }
        else {
            return null;
        }
    }


    async getUserByID(id) {
        var user_id = await User.findOne({_id: id});
        if(user_id) {
            console.log(user_id, "userid")
            let respose = { obj: user, errorMessage:"" }
            return user_id;
        }
        else {
            return null;
        }
    }

    async update(editedObj, email) {   
    
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
    
            // Load the actual corresponding object in the database.
            let userObject = await this.getUserByEmail(email);
            console.log(editedObj.email, "this is edit object")
            console.log(userObject, "userobject" )

            // Check if product exists.
            if(userObject) {
                console.log(userObject, "if user Object")
                // Product exists so update it.
                let updated = await User.updateOne(
                    { username: editedObj.username}, // Match id.
                    
                    // Set new attribute values here.
                    {$set: {username: editedObj.username,
                        firstName: editedObj.firstName,
                        lastName: editedObj.lastName,
                        email: editedObj.email}}); 
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



}



module.exports = UserRepo;

