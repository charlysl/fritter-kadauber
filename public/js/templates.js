(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['enter_freet'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group\">\n  <input type=\"text\" class=\"form-control\" id=\"freet-input\" placeholder=\"Freet here!\">\n</div>";
},"useData":true});
templates['homepage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['navbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <!-- Navigation -->\n"
    + ((stack1 = container.invokePartial(partials.set_username,depth0,{"name":"set_username","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n    <div class=\"container\">\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">Fritter!</a>\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul id=\"site-navigation\" class=\"nav navbar-nav\">\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : {},depth0,"username_selector",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "          <!--\n          <li>\n            <a href=\"#\">Services</a>\n          </li>\n          <li>\n            <a href=\"#\">Contact</a>\n          </li> -->\n        </ul>\n      </div>\n\n      <!-- /.navbar-collapse -->\n    </div>\n    <!-- /.container -->\n  </nav>";
},"usePartial":true,"useData":true});
templates['no_username'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<li>\n  <a id=\"choose-username\" data-toggle=\"modal\" href=\"#change-username-modal\">Choose Username</a>\n</li> ";
},"useData":true});
templates['prompt_username'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Username Prompt -->\n<h2>Choose your username</h2>\n<p>You don't seem to have entered a username yet. Choose one now and start Freeting!</p>\n<div class=\"form-group\">\n  <input type=\"text\" class=\"form-control\" id=\"username-prompt-input\" placeholder=\"Enter your username\">\n</div>";
},"useData":true});
templates['set_username'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<!-- Modal -->\n<div class=\"modal fade\" id=\"change-username-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Choose a Username</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"form-group\">\n          <label for=\"newUsername\">Username</label>\n          <input type=\"text\" class=\"form-control\" id=\"username-input\" placeholder=\"Enter your new username\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" id=\"set-username-btn\">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['username'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li>\n  <a id=\"change-username\" data-toggle=\"modal\" href=\"#change-username-modal\">Currently Freeting as <b>"
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"username","hash":{},"data":data}) : helper)))
    + "</b>. Click to change.</a>\n</li>";
},"useData":true});
})();