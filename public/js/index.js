$(document).ready(function() {
  // Allow using Handlebars templates as partials as well.
  Handlebars.partials = Handlebars.templates;

  var indexController = IndexController();

  var navbarController = NavbarController();

  // Keep track of form group elements
  var formGroups = [ $("#username-group"), $("#password-group"), // modal login
    $("#username-register-group"), $("#password-register-group"), $("#password-check-register-group"), // modal register
    $("#username-prompt-group"), $("#password-prompt-group"), // prompt login
    $("#username-prompt-register-group"), $("#password-prompt-register-group"), $("#password-prompt-check-register-group") // prompt register
  ];

  // Function to be called when rendering the navbar
  var renderNavbar = function () {
    $.get('/fritter/username', function(res) {
      // Put the navbar where it belongs
      var navbar = Handlebars.templates['navbar.hbs'](res);
      $('#navbar-content').html(navbar);

      // Identify all the error messages and hide them
      var navbarErrorMessageIds = ["invalid-login-message", "login-error-message", "already-logged-in-message", // modal login
        "non-unique-user-message", "non-matching-passwords-message" // modal register
      ];
      navbarErrorMessageIds.forEach(function (navbarErrorMessageId) {
        navbarController.identifyErrorMessage(navbarErrorMessageId);
      });

      var navbarFormGroupIds = [ "username-group", "password-group", // modal login
        "username-register-group", "password-register-group", "password-check-register-group" // modal register
      ]
      navbarFormGroupIds.forEach(function (navbarFormGroupId) {
        navbarController.identifyFormGroup(navbarFormGroupId);
      });
      hideErrors();


      var navbarInputIds = [ "username-input", "password-input", "login-btn", // modal login
        "username-register-input", "password-register-input", "password-check-register-input", "register-btn" ] // modal register

      // Allow format resets on input boxes
      var resetInputFormat = function () {
        navbarController.getErrorMessages().forEach(function (errorMessage) { errorMessage.hide(); });
        navbarController.getFormGroups().forEach(function (formGroup) { formGroup.removeClass("has-error"); });
      }
      navbarController.registerInputFormatResetter(resetInputFormat);
      
      navbarInputIds.forEach(function (navbarInputId) { 
        navbarController.attachInputFormatResetterListener(navbarInputId); 
      });


      // The function to call when a user asks to set their username
      var submitAccount = function () {
        // Retrieve the new username from the username setting modal input
        var newUsername = $("#username-register-input").val();
        var newPasswordHash = $("#password-register-input").val();
        // Send a post request to register to register a new account and log in
        $.post('/fritter/register', {
            username: newUsername,
            passwordHash: newPasswordHash
        }, function (res) {
          if (res.success) {
            updateWholePage();
          } else {
            $("#username-register-group").addClass("has-error");
            $("#non-unique-user-message").show();
          }
        });
      }

      navbarController.registerUsernameUpdater(submitAccount);

      navbarController.attachUsernameUpdaterListener("username-register-input");
      navbarController.attachUsernameUpdaterListener("password-register-input");
      navbarController.attachUsernameUpdaterListener("password-check-register-input");
      navbarController.attachUsernameUpdaterListener("register-btn");


      // The function to call when the user tries to log in
      var login = function () {
        // Retrieve the username
        var loginUsername = $("#username-input").val();
        var loginPassword = $("#password-input").val();
        // Send a post request to login to log in to the account
        $.post('/fritter/login', {
          username: loginUsername,
          passwordHash: loginPassword
        }, function (res) {
          console.log("response received");
          if (res.success) {
            updateWholePage();
          } else {
            $("#username-group").addClass("has-error");
            $("#password-group").addClass("has-error");
            if (res.err.name === "BadCredentials") {
              $("#invalid-login-message").show();
            } else {
              $("#login-error-message").show();
            }
          }
        });
      }

      navbarController.registerLoginListener(login);

      navbarController.attachLoginListener("username-input");
      navbarController.attachLoginListener("password-input");
      navbarController.attachLoginListener("login-btn");

      // Function to be called when the user logs out
      var logout = function () {
        $.post('/fritter/logout', {}, function (res) {
          if (res.success) {
            updateWholePage();
          }
        });
      }

      navbarController.registerLogoutListener(logout);

      navbarController.attachLogoutListener("log-out");

    });

  }

  indexController.registerNavbarRenderer(renderNavbar);

  // Render the navbar
  indexController.renderNavbar();

  // Function to be called when rendering the starting point
  var renderStartingPoint = function () {
    // Depending on whether the user is logged in, prompt for
    // a freet or ask them to log in.
    $.get('/fritter/username', function(res) {
      if (res.username) {
        var freetEntry = Handlebars.templates['enter_freet.hbs'](res);
        $('#starting-point').html(freetEntry);

        // Function to be called when a new freet is created
        var freetSaver = function(freet) {
          console.log(freet);
        }

        indexController.registerNewFreetListener(freetSaver);
        indexController.attachNewFreetListener("starting-point");

      } else {
        var usernamePrompt = Handlebars.templates['prompt_username.hbs'](res);
        $('#starting-point').html(usernamePrompt);

        // Find error message elements and hide them
        var indexErrorMessageIds = [ "invalid-login-prompt-message", // prompt login
          "non-unique-user-prompt-message", "non-matching-passwords-prompt-message" // prompt register
        ];
        indexErrorMessageIds.forEach(function (errorMessageId) {
          indexController.identifyErrorMessage(errorMessageId);
        });
        var indexFormGroupIds = [ "username-login-prompt-group", "password-login-prompt-group", // prompt login
          "username-prompt-register-group", "password-prompt-register-group", "password-prompt-check-register-group" ];// prompt register
        indexFormGroupIds.forEach(function (formGroupId) {
          indexController.identifyFormGroup(formGroupId);
        });
        hideErrors();

        var indexInputIds = [ "username-login-prompt-input", "password-login-prompt-input", "login-prompt-btn", // modal login
          "username-prompt-register-input", "password-prompt-register-input", "password-prompt-check-register-input", "register-prompt-btn" ] // modal register

        // Allow format resets on input boxes
        var resetInputFormat = function () {
          indexController.getErrorMessages().forEach(function (errorMessage) { errorMessage.hide(); });
          indexController.getFormGroups().forEach(function (formGroup) { formGroup.removeClass("has-error"); });
        }
        indexController.registerInputFormatResetter(resetInputFormat);
        
        indexInputIds.forEach(function (indexInputId) { 
          indexController.attachInputFormatResetterListener(indexInputId); 
        });

        // Function to be called when the username is entered
        var submitAccount = function () {
          var newUsername = $("#username-prompt-register-input").val();
          var newPasswordHash = $("#password-prompt-register-input").val();
          $.post('/fritter/register', {
            username: newUsername,
            passwordHash: newPasswordHash
          }, function (res) {
            if (res.success) {
              updateWholePage();
            } else {
              $("#username-prompt-register-group").addClass("has-error");
              $("#non-unique-user-prompt-message").show();
            }
          });
        }

        indexController.registerUsernameUpdater(submitAccount);

        // Attach the username updater listener to the appropriate input
        indexController.attachUsernameUpdaterListener("username-prompt-register-input");
        indexController.attachUsernameUpdaterListener("password-prompt-register-input");
        indexController.attachUsernameUpdaterListener("password-prompt-check-register-input");
        indexController.attachUsernameUpdaterListener("register-prompt-btn");

      }

    });

    

  }

  indexController.registerStartingPointRenderer(renderStartingPoint);

  // Render the starting point
  indexController.renderStartingPoint();

  // Update the navbar view to match the current state without reloading the page.
  var updateNavbar = function () {
    // Update the username in the navbar
    $.get('/fritter/username', function (res) {
      indexController.renderNavbar();
    });
  }

  navbarController.registerViewUpdater(updateNavbar);

  // Update the index view to match the current state without reloading the whole page.
  var updateIndexContent = function () {
    // Re-render the starting point
    indexController.renderStartingPoint();
  }

  indexController.registerViewUpdater(updateIndexContent);
  
  // A catchall function to bring the whole page up to date
  var updateWholePage = function () {
    indexController.updateIndexView();
    navbarController.updateNavbarView();
    $("#change-username-modal").modal("hide"); // make sure modals are totally hidden
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    
    // No errors should be showing after a page update
    hideErrors();
  }

  // A helper function for hiding all the errors on the page.
  var hideErrors = function () {
    // Hide all error messages in index
    indexController.getErrorMessages().forEach(function (message) {
      message.hide();
    });

    // Hide all error messages in navbar
    navbarController.getErrorMessages().forEach(function (message) {
      message.hide();
    });

    // Input elements should not look like they have errors
    indexController.getFormGroups().forEach(function (group) {
      group.removeClass("has-error");
    });
    navbarController.getFormGroups().forEach(function (group) {
      group.removeClass("has-error");
    });
  }

});

