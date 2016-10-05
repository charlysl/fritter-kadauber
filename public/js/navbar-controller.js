$(document).ready(function() {
  // Allow using Handlebars templates as partials as well.
  Handlebars.partials = Handlebars.templates;

  // The function to call when a user asks to set their username
  var setUsername = function () {
    // Bring up the username setting modal
    // The only element we're guaranteed to have is the navbar, so
    // we have to put the html somewhere nearby
    console.log("setting username");
    var modal = Handlebars.templates.set_username({});
    
  }
  // When the user wants to choose their username, allow them
  // to choose their username, then update the display
  $("#choose-username").click(setUsername);

  // When the user wants to change their username, allow them
  // to change their username, then update the display
  $("#change-username").click(setUsername);
});

