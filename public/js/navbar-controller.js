$(document).ready(function() {
  // Allow using Handlebars templates as partials as well.
  Handlebars.partials = Handlebars.templates;

  // The function to call when a user asks to set their username
  var setUsername = function () {
    // Retrieve the new username from the username setting modal input
    var newUsername = $("#username-input").val();
    console.log(newUsername);
    // Send a post request to username altering the username stored
    // for the session
    $.post('/register', {
        username: newUsername
    }, function (res) {
      if (res.success) {
        // Update the navbar
        var usernameItem = Handlebars.templates.username(res);
        $("#site-navigation").html(usernameItem);
      } else {
        alert(res.message);
      }
    });
  }
  // When the user wants to choose their username, allow them
  // to choose their username, then update the display
  $("#set-username-btn").click(setUsername);
});

