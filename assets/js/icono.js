$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    menu: '#menu',
    scrollingSpeed: 1500,
    loopHorizontal: false,
    slidesNavigation: true
  });

  $("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
  $("iframe").addClass('embed-responsive-item');
});