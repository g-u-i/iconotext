this["plateforme"] = this["plateforme"] || {};
this["plateforme"]["posts"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "    <div class=\"container abstract\">\n      <h1>"
    + ((stack1 = ((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</h1>\n      <h1><span>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></h1>\n        <div class=\"tags\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n    <div class=\"container article\">\n      "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.photos : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      "
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.embed_code : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <a href=\"#"
    + alias2(alias1(depth0, depth0))
    + "\" class=\""
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,(depths[2] != null ? depths[2].query : depths[2]),{"name":"if_eq","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" >#"
    + alias2(alias1(depth0, depth0))
    + "</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "on";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.original_size : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" class=\"img-responsive\" >\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.posts : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
this["plateforme"]["tags"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <a href=\"#"
    + alias2(alias1(depth0, depth0))
    + "\" class=\""
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,(depths[1] != null ? depths[1].query : depths[1]),{"name":"if_eq","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" >#"
    + alias2(alias1(depth0, depth0))
    + "</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "on";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<a href=\"./\">all</a>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<a href=\"https://www.instagram.com/the.changing.room/\" target=\"_blank\" class=\"insta\" >instagram <img src=\"./assets/images/insta.png\"></a>";
},"useData":true,"useDepths":true});