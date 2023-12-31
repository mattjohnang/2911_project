var express       = require('express');
var mongoose      = require('mongoose');
var passport      = require('passport');
var http          = require('http');
var path          = require('path');
var engine        = require('ejs-locals');
var bodyParser    = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

var request = require('request-promise');

const DB_URI      = 'mongodb://localhost:27017/testdb';
let options       = { useNewUrlParser: true , useUnifiedTopology: true };
mongoose.connect(DB_URI, options);
mongoose.set('useCreateIndex', true);

var app           = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
const User = require('./Models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 // Enable routing and use port 1337.
require('./router')(app);
app.set('port', 1337);


 // Set up ejs templating.
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Set view folder.
app.set('views', path.join(__dirname, 'views'));

// That line is to specify a directory where you could 
// link to static files (images, CSS, etc.). 
// So if you put a style.css file in that directory and you 
// could link directly to it in your view <link href=”style.css” rel=”stylesheet”>
app.use(express.static(path.join(__dirname, 'static')));
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});








// var express = require('express');
// var bodyParser = require('body-parser');
// var request = require('request-promise');
// var app = express();
 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.get('/postdatatoFlask', async function (req, res) {
//   var data = { // this variable contains the data you want to send
//       data1: "foo",
//       data2: "bar"
//   }
//   var options = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:5000/postdata',
//       body: data,
//       json: true // Automatically stringifies the body to JSON
//   };
  
//   var returndata;
//   var sendrequest = await request(options)
//   .then(function (parsedBody) {
//       console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
//       returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
//   })
//   .catch(function (err) {
//       console.log(err);
//   });
  
//   res.send(returndata);
// });

// app.set('port', 1337);
 
// app.listen(3000);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });