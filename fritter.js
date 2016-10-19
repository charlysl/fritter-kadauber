// Running "npm start" from this top-level directory
// will set the app running at hostname:3000

var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var util = require('./util/util');

var app = express();

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fritterdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected to", db.name);
});

// Get the user database
var User = require('./models/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log("set views to", path.join(__dirname, 'views'));
app.set('view engine', "hbs");
console.log("set view engine to hbs");
hbs.registerPartials(path.join(__dirname, 'views/partials'));
console.log("registered partials");

// Express looks up files relative to the static directory
app.use(express.static('public'));
console.log("set static resources directory");

// Ensure session usage with middleware
app.use(session({ secret: 'notsosecret', resave: true, saveUninitialized: true }));
console.log("use session plugin");

// Use the appropriate routes
var fritterRoutes = require('./routes/index');
app.use('/fritter', fritterRoutes);
console.log("use fritter routes");

// Send basic request to fritter
app.get('/', function (req, res) {
    console.log("redirecting to fritter");
    res.redirect('fritter');
});

// Ensure authentication with middleware
app.use(function (req, res, next) {
  console.log("ensuring authentication");
    // If the user claims to be authenticated, check that they really are
    if (req.session.authenticated) {
        var storedHash = req.session.passwordHash;
        User.findOne({ username: req.session.username }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                // Check that the stored password hash for the current session is the same
                // as the purported user's password hash
                if (storedHash == user.passwordHash) {
                    res.json({ username: req.session.username, username_selector: "username.hbs"});
                    // next();
                } else {
                    // If it's not, de-authenticate the user and send them back to the homepage
                    req.session.authenticated = false;
                    res.redirect('/');
                }
            }
        });
    } else {
        res.json({ username_selector: "no_username.hbs" });
    }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("caught 404");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      'message': err.message,
      'error': err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'error': err.message
  });
});


module.exports = app;
