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
      console.log(data)

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
  console.log('posts', posts, blogUrl);

  $('#results').html(ico.posts( {posts:posts} ) );

}

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
