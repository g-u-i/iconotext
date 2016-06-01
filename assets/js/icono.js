var posts = [];

function getPosts(offset) {
  $.ajax({
    url:"http://api.tumblr.com/v2/blog/thechangingroom.tumblr.com/posts/",
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

getPosts(0);

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
