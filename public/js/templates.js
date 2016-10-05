(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['homepage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['navbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <!-- Navigation -->\n  <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n    <div class=\"container\">\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">Fritter!</a>\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n"
    + ((stack1 = container.invokePartial(helpers.lookup.call(depth0 != null ? depth0 : {},depth0,"username_selector",{"name":"lookup","hash":{},"data":data}),depth0,{"data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "          <!--\n          <li>\n            <a href=\"#\">Services</a>\n          </li>\n          <li>\n            <a href=\"#\">Contact</a>\n          </li> -->\n        </ul>\n      </div>\n\n      <!-- /.navbar-collapse -->\n    </div>\n    <!-- /.container -->\n  </nav>";
},"usePartial":true,"useData":true});
templates['no_username'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<li>\n  <a id=\"choose-username\" href=\"#\">Choose Username</a>\n</li> ";
},"useData":true});
templates['username'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li>\n  <a id=\"change-username\" href=\"#\">Posting as: "
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"username","hash":{},"data":data}) : helper)))
    + "</a>\n</li>";
},"useData":true});
})();