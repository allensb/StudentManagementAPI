// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 7000; // set our port


// REGISTER OUR ROUTES -------------------------------
app.use('/api', require('./routes'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on ' + port);