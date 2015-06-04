(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photo'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class='photo'>\n	<div>\n		<img class='centered' src=\""
    + alias3(((helper = (helper = helpers.photoUrl || (depth0 != null ? depth0.photoUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"photoUrl","hash":{},"data":data}) : helper)))
    + "\">\n	</div>\n	<div>\n		<input class='centered' value=\""
    + alias3(((helper = (helper = helpers.photoUrl || (depth0 != null ? depth0.photoUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"photoUrl","hash":{},"data":data}) : helper)))
    + "\">\n	</div>\n</li>";
},"useData":true});
})();
