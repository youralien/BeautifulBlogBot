/* REQUIRES */
// ...npm
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FlickrOptions = require('./flickrOptions.js');

// ...local
var index = require('./routes/index.js');

// Flickr.authenticate(FlickrOptions, function(error, flickr) {
//   var app = express();
//   app.use(logger('dev'));
//   app.use(bodyParser.json());
//   app.use(bodyParser.urlencoded({ extended: false }));
//   app.use(cookieParser());
//   app.use(express.static(path.join(__dirname, 'public')));
//   app.engine('handlebars', exphbs({defaultLayout: 'main'}));
//   app.set('view engine', 'handlebars');
// 	flickr.proxy(app, "/service/rest");

// 	/* ROUTING */
// 	app.get('/', index.home);

// 	app.listen(process.env.PORT || 3000);
// });
/* CONNECT TO MONGOOSE */
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');


/* CONFIG APP */
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* ROUTING */
app.get('/', index.home);
app.post('/analyzeText', index.analyzeText);
app.get('/search', index.search);

app.listen(process.env.PORT || 3000);