var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Freets = require('../models/freets');

// Render the homepage
router.get('/', function (req, res, next) {
  console.log("rendering homepage from", req.referrer);
  res.render('homepage.hbs');
});

// If there is a username, have the navbar display the username
// Otherwise, have it display the username selector
router.get('/username', function (req, res) {
  console.log("getting username");
  if (req.session && req.session.username) {
    console.log("found username");
    res.json({ username: req.session.username, username_selector: "username.hbs"});
  } else {
    console.log("couldn't find username");
    res.json({ username_selector: "no_username.hbs" });
  }
});

// Register a new user account
router.post('/register', function (req, res) {
  console.log("registering new user");
  console.log("req url", req.url);
  console.log(req.body);
  // Store the new user
  var user = req.body;
  Users.create({ username: user.username,
                passwordHash: user.passwordHash }, 
    function (err, record) { 
      console.log("creating record");
      if (err) {
        console.log(err);
        res.json({
          success: false,
          err: err
        });
      } else {
        console.log("record", record);
        req.session.authenticated = true;
        req.session.username = record.username;
        req.session.passwordHash = record.passwordHash;
        res.json({
          success: true,
          username: req.session.username,
          passwordHash: req.session.passwordHash
        });
      }
    });
});

// Log in a user if they're not already logged in
router.post('/login', function (req, res) {
  console.log("received login request");
  console.log("request", req.body);
  var data = req.body;
  console.log("session info", req.session);
  // Check that the user isn't logged in
  if (req.session.authenticated) {
    console.log("user already logged in");
    res.json({
      success: false,
      err: "alreadyLoggedIn",
      message: "User already logged in"
    });
  } else {
    console.log("logging in");
    // Check that the password is correct
    // Users.findOne({ username: "me" }, function (err, record) {
    //   if (err) { console.log("err", err); } else { console.log("rec", record); }
    // });
    Users.findOne({ username: data.username }, 
      function (err, record) {
      console.log("finding user");
      console.log(record);
      if (err) { // can't find the username
        console.log(err);
        res.json({
          success: false,
          err: err
        });
      } else {
        var correctPasswordHash = record.passwordHash;
        if (data.passwordHash === correctPasswordHash) {
          console.log("password was good");
          req.session.authenticated = true;
          req.session.username = record.username;
          req.session.passwordHash = record.passwordHash;
          console.log("session info:", req.session);
          res.json({
            success: true,
            username: req.session.username,
            passwordHash: req.session.passwordHash
          });
        } else {
          res.json({
            success: false,
            err: {
              name: "BadCredentials",
              message: "Username and password do not match"
            }
          });
        }
      }
    });
  }
});

// Log a user out
router.post('/logout', function (req, res) {
  console.log("logging out");
  req.session.authenticated = false;
  req.session.username = "";
  req.session.passwordHash = "";
  res.json({
    success: true
  });
});

router.post('/write-freet', function (req, res) {
  console.log("writing freet");
  var freetData = req.body;
  Freets.create( {
    author: freetData.authorId,
    content: {
      isRefreet: freetData.isRefreet,
      refreetId: freetData.refreetId,
      text: freetData.text
    }
  }, function (err, record) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        err: err
      });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;