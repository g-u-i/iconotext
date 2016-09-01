$(document).ready(function() {

  locationHashChanged();

  $("a[href^='#']").on('click', function(e) {

    e.preventDefault();

    var newHash = this.hash;

    $('html, body').animate({
       scrollTop: $(this.hash).offset().top
    }, 300, function(){ window.location.hash = newHash });

  });

  function locationHashChanged() {
    $("#nav a").removeClass('active');
    $("#nav a[href='"+location.hash+"']").addClass('active');
  }

  window.onhashchange = locationHashChanged;
  $("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
  $("iframe").addClass('embed-responsive-item');
});
