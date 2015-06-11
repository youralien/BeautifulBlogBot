(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['loader'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"loaderPartial\">\n    <h4>Images Loading...</h4>\n    <div class=\"progress\">\n      <div class=\"indeterminate\"></div>\n    </div>\n</div>\n\n        \n\n";
},"useData":true});
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
templates['sampleArticles'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"collection\">\n  <a id=\"testArticlePopulate0\" class=\"collection-item avatar\">\n    <img src=\"images/facebook.png\" alt=\"\" class=\"circle\">\n    <span class=\"title\">Sheryl Sandburg's reflection about the month after her husband's passing</span>\n    <p>Today is the end of sheloshim for my beloved husband—the first thirty days.<br>\n       http://on.fb.me/1Idb1n1\n    </p>\n  </a>\n  <a id=\"testArticlePopulate1\" class=\"collection-item avatar\">\n    <img src=\"images/quora.png\" alt=\"\" class=\"circle\">\n    <span class=\"title\">Explore: Listen to your user's fairy-tales</span>\n    <p>A Reflection on User Oriented Collaborative Design by Ryan Louie<br>\n       http://uocd.quora.com/Explore-Listen-to-your-users-fairy-tales\n    </p>\n  </a>\n  <a id=\"testArticlePopulate3\" class=\"collection-item avatar\">\n    <img src=\"images/medium.png\" alt=\"\" class=\"circle\">\n    <span class=\"title\">7 Rules for Creating Gorgeous UI (Part 1)</span>\n    <p>A non-artsy primer in digital aesthetics<br>\n       https://medium.com/@erikdkennedy/7-rules-for-creating-gorgeous-ui-part-1-559d4e805cda\n    </p>\n  </a>\n</div>\n";
},"useData":true});
templates['topTopics'] = template({"1":function(depth0,helpers,partials,data) {
    return "			<li class=\"collection-item\">"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"topTopicsPartial\">\n	<ul class=\"collection with-header\">\n		<li class=\"collection-header\"><h4>Article Topics</h4></li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.topTopics : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});
})();
