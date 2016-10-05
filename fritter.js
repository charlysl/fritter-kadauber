// Running this script with
// node fritter.js
// will set the app running at hostname:3000

var express = require('express');

var app = express();
// Express looks up files relative to the static directory
app.use(express.static('public'));

// If there is a username, have the navbar display the username
// Otherwise, have it display the username selector
app.get('/username', function (req, res) {
    if (req.session && req.session.username) {
        res.json({ username: req.session.username, username_selector: "username"});
    } else {
        res.json({ username_selector: "no_username" })
    }
});

// Show the Fritter homepage
// app.get('/', function (req, res) {
//     res.render("index");
// });

app.listen(3000);