var posts = [];
var blogUrl = '';

$('#blogLoader').submit(function( event ) {
  event.preventDefault();
  blogUrl = getRootUrl($('#blogLoader #blogUrl').val());
  getPosts(0);
});

function getPosts(offset) {
  console.log(blogUrl, offset)
  $.ajax({
    url:'http://api.tumblr.com/v2/blog/'+blogUrl+'/posts/',
    data: {
      api_key:'Srhk9qkcJO69pAoB4ltM5uIqpwUBO7kgDqDEaCD9Jo8EafWyHE',
      notes_info: true,
      offset:offset
    },
    dataType: 'jsonp',
    success: function(data){

      posts = posts.concat(data.response.posts);

      if (data.response.posts.length == 20) {
        getPosts(offset + 20);
      }else{
        render(posts);
      }
    }
  });
}

function render(posts){
  $('#results').html(ico.posts( {posts:posts} ) );
}

// exports

var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#savePdf').click(function () {
    doc.fromHTML($('#results').first().html(), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
});


$("#saveImg").click(function() {
    html2canvas($("#results"), {
        onrendered: function(canvas) {
            theCanvas = canvas;
            document.body.appendChild(canvas);

            // Convert and download as image
            Canvas2Image.saveAsPNG(canvas);
            $("#img-out").append(canvas);
            // Clean up
            //document.body.removeChild(canvas);
        }
    });
});


$("#imgDataUri").click(function() {

  $('img').each(function(index){

    var that = this;

    setTimeout(function(){
      convertFileToDataURLviaFileReader($(that).attr('src'), function(base64Img){
        $(that).attr('src', base64Img);
        $(that).addClass('bordered');
      })
    }, index * 1000)

  })

  function convertFileToDataURLviaFileReader(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

});

// utils
function getRootUrl(url) {
  return url
      .toString()
      .replace(/^(.*\/\/[^\/?#]*).*$/,"$1")
      .replace('http://','')
      ;
}

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});
