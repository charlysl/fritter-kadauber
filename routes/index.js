var express = require('express');
var router = express.Router();
var User = require('../models/users');

// Render the homepage
router.get('/', function (req, res, next) {
  console.log("rendering homepage");
  res.render('homepage');
});

// If there is a username, have the navbar display the username
// Otherwise, have it display the username selector
router.get('/username', function (req, res) {
  if (req.session && req.session.username) {
      res.json({ username: req.session.username, username_selector: "username.hbs"});
  } else {
      res.json({ username_selector: "no_username.hbs" });
  }
});

// Change the username stored for the session
router.post('/register', function (req, res) {
  // Store the new user
  var user = req.body;
  User.create({ username: user.username, 
                passwordHash: user.passwordHash }, 
    function (err, record) { 
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: err.message
        });
      }
      console.log(record.getUsername());
      req.session.authenticated = true;
      req.session.username = record.username;
      req.session.passwordHash = record.passwordHash;
      res.json({
        success: true,
        username: req.session.username,
        passwordHash: req.session.passwordHash
      });
    });
});

module.exports = router;