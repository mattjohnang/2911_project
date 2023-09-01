
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const MovieRepo = require('../Data/MovieRepo')
const _movieRepo = new MovieRepo();

const ReviewRepo = require('../Data/ReviewRepo');
const _reviewRepo = new ReviewRepo();
const Review = require('../Models/Review');




exports.Reviews  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

        let movieID = req.query._id;
        let movieObj = await _movieRepo.getMovie(movieID)
        let reviews = await _reviewRepo.allReview()

        res.render('User/Reviews', {errorMessage:"", reqInfo:reqInfo, movie:movieObj,
    reviews:reviews})
  
}


exports.My_Reviews  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {
        let reviews = await _reviewRepo.allReview()

        res.render('User/My_Reviews', {errorMessage:"", reqInfo:reqInfo, reviews:reviews})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}




exports.WriteReview = async function(req, res){
    let reqInfo = RequestService.reqHelper(req);
    console.log(req, "this is req")
   
    if(reqInfo.authenticated) {
        let movieID = req.query._id;
        let movieObj = await _movieRepo.getMovie(movieID)

        res.render('User/WriteReview', {errorMessage:"", reqInfo:reqInfo, movie:movieObj})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
    }

    
exports.CreateReview = async function(request, response) {
    let movieID = request.body._id;
    let date = new Date();
    let wholeDate = date.toDateString();
    let dateSubString = wholeDate.substring(4)


    let tempReviewObj  = new Review( {
        username:       request.body.username,
        stars:          request.body.stars,
        review:         request.body.review,
        movieName:      request.body.movieName,
        movieID:        request.body.movieID,
        date: dateSubString

    });
    tempReviewObj.save()
    return response.redirect('/')
  
  
};


exports.EditReview = async function(req, response){
    let reqInfo = RequestService.reqHelper(req);
    let reviewID = req.query._id
    let movieID = req.body._id;
    let movieObj = await _movieRepo.allMovies(movieID)
    console.log(reviewID, "review id")
    console.log(reqInfo.username)
    if(reqInfo.authenticated) {
        let reviewObj = await _reviewRepo.getReview(reviewID);
        console.log(reviewObj)
        console.log(reqInfo, "reqInfo")

        response.render('User/EditReview',{  reqInfo:reqInfo, review: reviewObj, movie: movieObj,
         errorMessage: ""})
    }
    else {
        response.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }


};


exports.Update_Review = async function(req, response){
    let reqInfo = RequestService.reqHelper(req);
    let date = new Date();
    let wholeDate = date.toDateString();
    let dateSubString = wholeDate.substring(4)

    var newReview = new Review({
        username:    req.body.username,
        stars:     req.body.stars,
        review:        req.body.review,
        movieName:     req.body.movieName,
        _id: req.body._id,
        movieID:        req.body.movieID,
        date:       dateSubString

    });

    let reviewID = req.body._id 
    let responseObject = await _reviewRepo.update(newReview);
    console.log(responseObject)
    let reviewObj = await _reviewRepo.getReview(reviewID);

    if(responseObject.errorMessage == "") {
        response.redirect('My_Reviews');
    }

    else {
        response.render('User/EditReview', { 
            reqInfo:reqInfo,
            user:      responseObject.obj, 
            review: reviewObj,
            errorMessage: responseObject.errorMessage });
    }

}

exports.DeleteReview  = async function(req, res){
    let id = req.query._id
    _reviewRepo.deleteReview(id)
    res.redirect('My_Reviews')
}
