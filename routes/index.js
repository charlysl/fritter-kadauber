var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Freets = require('../models/freets');

// Render the homepage
router.get('/', function (req, res, next) {
  console.log("rendering homepage");
  res.render('homepage.hbs');
});

router.get('/favicon.ico', function (req, res, next) {
  next();
});

// If there is a username, have the navbar display the username
// Otherwise, have it display the username selector
router.get('/username', function (req, res) {
  if (req.session && req.session.username) {
    res.json({ id: req.session.id, username: req.session.username, username_selector: "username.hbs"});
  } else {
    res.json({ username_selector: "no_username.hbs" });
  }
});

// Register a new user account
router.post('/register', function (req, res) {
  console.log(req.body);
  // Store the new user
  var user = req.body;
  Users.create({ username: user.username,
                passwordHash: user.passwordHash }, 
    function (err, record) { 
      if (err) {
        console.log(err);
        res.json({
          success: false,
          err: err
        });
      } else {
        console.log("record", record);
        req.session.authenticated = true;
        req.session.id = record._id;
        req.session.username = record.username;
        req.session.passwordHash = record.passwordHash;
        res.json({
          success: true,
          id: req.session.id,
          username: req.session.username,
          passwordHash: req.session.passwordHash
        });
      }
    });
});

// Log in a user if they're not already logged in
router.post('/login', function (req, res) {
  var data = req.body;
  // Check that the user isn't logged in
  if (req.session.authenticated) {
    res.json({
      success: false,
      err: "alreadyLoggedIn",
      message: "User already logged in"
    });
  } else {
    // Check that the password is correct
    // Users.findOne({ username: "me" }, function (err, record) {
    //   if (err) { console.log("err", err); } else { console.log("rec", record); }
    // });
    Users.findOne({ username: data.username },
      function (err, record) {
      console.log(record);
      if (err) { // error looking for username
        console.log(err);
        res.json({
          success: false,
          err: err
        });
      } else if (record === null) {
        res.json({
          success: false,
          err: {
            name: "UserNotFound",
            message: "Username not found in database"
          }
        });
      } else {
        var correctPasswordHash = record.passwordHash;
        if (data.passwordHash === correctPasswordHash) {
          req.session.authenticated = true;
          req.session.id = record._id;
          req.session.username = record.username;
          req.session.passwordHash = record.passwordHash;
          res.json({
            success: true,
            id: req.session.id,
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
  req.session.authenticated = false;
  req.session.id = -1;
  req.session.username = "";
  req.session.passwordHash = "";
  res.json({
    success: true
  });
});

router.post('/write-freet', function (req, res) {
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
      res.json({ 
        success: true,
        id: record._id,
        author: req.session.username,
        content: record.content.text
      });
    }
  });
});

router.get('/get-all-freets', function (req, res) {
  console.log("getting all freets");

  Freets.find().exec(function (err, freets) {
    Freets.populate(freets, {path: 'author'}, function (err, result) {
      console.log("populated", result);
    });
    // var formattedFreets = freets.map(function (freet) {
    //   return {
    //     _id: freet._id,
    //     author: freet.
    //   }
    // })
    res.json({ freets: [ {_id: 1, author: "me", isRefreet: false, content: "hello" } ] });
  });
  // Freets.populate({ path: 'author' });
  // Freets.find().exec(function (err, freets) {
  //   Freets.populate(freets, {path: 'author', model: Users}, function (err, result) {
  //     console.log("populated");
  //     res.json({ freets: freets.map(formatFreets)})
  //   })
  // });
});

var formatFreet = function (freet) {
  console.log("formatting freets");
  return {
      _id: freet._id,
      author: freet.author.username,
      isRefreet: freet.content.isRefreet,
      content: freet.content.text
    };
  // if (!freet.isRefreet) {
  //   return {
  //     _id: freet._id,
  //     author: freet.author.username,
  //     isRefreet: freet.content.isRefreet,
  //     content: freet.content.text
  //   };
  // } else {
  //   var refreetString;
  //   Freets.findOne({ _id: freet.refreetId }, function (err, refreeted) {
  //     if (err) {
  //       console.log(err);
  //       refreetString = "Error";
  //     } else {
  //       var formattedRefreet = formatFreet(refreeted);
  //       refreetString = formattedRefreet.author + ": " + formattedRefreet.content;
  //     }
  //   });

  //   return {
  //     _id: freet._id,
  //     author: freet.author.username,
  //     isRefreet: freet.content.isRefreet,
  //     content: refreetString
  //   }
  // }
}

module.exports = router;