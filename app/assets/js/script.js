var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function(){
    retriveData();
});

var slideId = 0;



$(document)
  .click(next)
  .keypress(function( event ) {
    console.log(event )
    if ( event.which == 32 ) next()
  })
  ;

$(document).keydown(function(e) {
  switch(e.which) {
      case 37: prev() // left
      break;

      case 38: prev() // up
      break;

      case 39: next() // right
      break;

      case 40: next() // down
      break;

      default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

function getCurId(){
  if(window.location.hash) {
   return parseInt(window.location.hash.replace('#sl',''))
  }else{
  return -1
  }
}
function goTo(cur){
  console.log(cur)
  location.hash = "#sl"+cur;
}

function next(){
  var slideId = ( getCurId() + 1 ) % ($(".slide").length-1); //% $(".slide").length - 1;
  goTo(slideId);
}

function prev(){
  var slideId = Math.max(-1,getCurId()-1);
  goTo(slideId);
}

// grab data
function retriveData() {
    var dataSource = 'data/data.json?='+Date.now();
    jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
};

// render compiled handlebars template
function renderDataVisualsTemplate(data){
    handlebarsDebugHelper();
    renderHandlebarsTemplate('templates/basic.hbs?='+Date.now(), '#data-details', data);
};

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
    var source, template;
    jqueryNoConflict.ajax({
        url: path,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
};

// function to compile handlebars template
function renderHandlebarsTemplate(withTemplate,inElement,withData){
    getTemplateAjax(withTemplate, function(template) {
        jqueryNoConflict(inElement).html(template(withData));
    })
};

// add handlebars debugger
function handlebarsDebugHelper(){
    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
    });
    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": Math.floor(lvalue + rvalue),
            "-": Math.floor(lvalue - rvalue),
            "*": Math.floor(lvalue * rvalue),
            "/": Math.floor(lvalue / rvalue),
            "%": Math.floor(lvalue % rvalue)
        }[operator];
    });
};
