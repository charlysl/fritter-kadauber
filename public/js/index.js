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

  // Keep track of error message elements
  var errorMessages = [ $("#invalid-login-message"), // modal login
    $("#non-unique-user-message"), $("#non-matching-passwords-message"), // modal register
    $("#invalid-login-prompt-message"), // prompt login
    $("#non-unique-user-prompt-message"), $("#non-matching-passwords-prompt-message") // prompt register
  ];

  // Function to be called when rendering the navbar
  var renderNavbar = function () {
    $.get('/fritter/username', function(res) {
      console.log(typeof(Handlebars.templates['navbar.hbs']));
      var navbar = Handlebars.templates['navbar.hbs'](res);
      $('#navbar-content').html(navbar);

      // The function to call when a user asks to set their username
      var setUsername = function () {
        console.log("setting username");
        // Retrieve the new username from the username setting modal input
        var newUsername = $("#username-register-input").val();
        var newPasswordHash = $("#password-register-input").val();
        // Send a post request to username altering the username stored
        // for the session
        $.post('/fritter/register', {
            username: newUsername,
            passwordHash: newPasswordHash
        }, function (res) {
          console.log("handling response", res.success);
          if (res.success) {
            updateWholePage();
          } else {
            $("#username-register-group").addClass("has-error");
            $("#non-unique-user-message").show();
          }
        });
      }

      navbarController.registerUsernameUpdater(setUsername);

      navbarController.attachUsernameUpdaterListener("username-register-input");
      navbarController.attachUsernameUpdaterListener("password-register-input");
      navbarController.attachUsernameUpdaterListener("password-check-register-input");
      navbarController.attachUsernameUpdaterListener("register-btn");
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
        var freetEntry = Handlebars.templates.enter_freet(res);
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

        // Function to be called when the username is entered
        var enterUsername = function () {
          var newUsername = $("#username-prompt-input").val();
          var newPasswordHash = $("#password-prompt-input").val();
          $.post('/fritter/register', {
            username: newUsername,
            passwordHash: newPasswordHash
          }, function (res) {
            if (res.success) {
              updateWholePage();
            }
          });
        }

        indexController.registerUsernameUpdater(enterUsername);

        // Attach the username updater listener to the appropriate input
        indexController.attachUsernameUpdaterListener("username-prompt-input")
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
    // Hide all error messages
    errorMessages.forEach(function (message) {
      message.hide();
    });

    // Input elements should not look like they have errors
    inputs.forEach(function (input) {
      input.removeClass("has-error");
    });
  }
  

});

