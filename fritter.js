// Running "npm start" from this top-level directory
// will set the app running at hostname:3000

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
// Express looks up files relative to the static directory
app.use(express.static('public'));
// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// Ensure session usage with middleware
app.use(session({ secret: 'notsosecret', resave: true, saveUninitialized: true }));

// If there is a username, have the navbar display the username
// Otherwise, have it display the username selector
app.get('/username', function (req, res) {
    if (req.session && req.session.username) {
        res.json({ username: req.session.username, username_selector: "username"});
    } else {
        res.json({ username_selector: "no_username" });
    }
});

// Change the username stored for the session
app.post('/register', function (req, res) {
    // Store the username
    var body = req.body;
    req.session.username = body.username;
    res.json({ success: true, username: req.session.username });
});

// app.listen(3000);
app.listen();