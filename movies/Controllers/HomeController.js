
const MovieRepo   = require('../Data/MovieRepo');
const _movieRepo = new MovieRepo();
const ReviewRepo = require('../Data/ReviewRepo');
const _reviewRepo = new ReviewRepo();
const Review = require('../Models/Review');

const RequestService = require('../Services/RequestService');

exports.Index = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let movies = await _movieRepo.allMovies();

    let stars = []
    let revsNum = []

    for (let i = 0 ; i < movies.length ; i++) {
        let total = 0
        let reviews = await _reviewRepo.allReviews(movies[i].movieName);
        for (let j = 0 ; j < reviews.length ; j++) {
            total += reviews[j].stars
        }
        let reviewAmnt = reviews.length
        stars.push(Math.round(10 * total / reviewAmnt)/10)
        revsNum.push(reviewAmnt)
    }

    if(movies!= null) {
        res.render('Home/Index', { reqInfo:reqInfo,  movies: movies, 
            stars:stars, revsNum: revsNum
        })
    }
    else {
        res.render('Home/Index', { movies:[], reqInfo:reqInfo,
                            stars: [], reviewsNum: [] })
    }
    
};
