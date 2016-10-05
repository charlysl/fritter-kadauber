$(document).ready(function() {
  // Allow using Handlebars templates as partials as well.
  Handlebars.partials = Handlebars.templates;

  // On document load, add the navbar to the top of the page.
  $.get('/username', function(res) {
    console.log(res);
    var navbar = Handlebars.templates.navbar(res);
    $('body').prepend(navbar);
  });


  
/**
  // On submit button click, create the activity and display it.
  $('#submit-button').click(function() {
    // Create activity with POST request.
    $.post('/activities', {
        type: $('#type-input').val(),
        duration: $('#minutes-input').val(),
        intensity: $('#intensity-input').val()
    }, function(resp) {
      if (resp.success) {
        // Display activity.
        var html = Handlebars.templates.activity_item(resp.activity);
        $(insertSelector).after(html);
      } else {
        alert(resp.message);
      }
    });
  });
  */
});

