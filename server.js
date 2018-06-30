
// Node Dependencies
var express = require('express');// web application framework 
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');//This parses the body portion of an incoming HTTP request and makes it easier to extract different parts of the contained information. For example, you can use this to read POST parameters.
var mongoose = require('mongoose');
var logger = require('morgan'); // for debugging //An HTTP request logger middleware for node.
var request = require('request'); // for web-scraping
var cheerio = require('cheerio'); // for web-scraping


// Initialize Express for debugging & body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nprnews"
mongoose.Promise = Promise;

  mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('openUri()', function() {
  console.log('Mongoose connection successful.');
});
//we require() modules from our routes directory. These modules/files contain code for handling particular sets of related "routes" (URL paths).
// Import the Comment and Article models
var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');
// ---------------------------------------------------------------------------------------------------------------



// Import Routes/Controller
var router = require('./controllers/controller.js');
app.use('/', router);


// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});
