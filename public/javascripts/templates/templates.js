(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photo'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class='photo'>\n	<div>\n		<img class='centered' src=\""
    + alias3(((helper = (helper = helpers.photoUrl || (depth0 != null ? depth0.photoUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"photoUrl","hash":{},"data":data}) : helper)))
    + "\">\n	</div>\n	<div>\n		<input class='centered' value=\""
    + alias3(((helper = (helper = helpers.ownername || (depth0 != null ? depth0.ownername : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ownername","hash":{},"data":data}) : helper)))
    + "\">\n	</div>\n	<div>\n		<input class='centered' value=\""
    + alias3(((helper = (helper = helpers.photoUrl || (depth0 != null ? depth0.photoUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"photoUrl","hash":{},"data":data}) : helper)))
    + "\">\n	</div>\n</li>";
},"useData":true});
templates['topTopics'] = template({"1":function(depth0,helpers,partials,data) {
    return "			<li class=\"collection-item\">"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n	<ul class=\"collection with-header\">\n		<li class=\"collection-header\"><h4>Article Topics</h4></li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.topTopics : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});
})();
