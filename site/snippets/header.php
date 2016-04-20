<!DOCTYPE html>
<html lang="en">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
  <title>Iconotexte</title>
  <link rel="stylesheet" type="text/css" href="assets/css/jquery.fullPage.css" />
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="assets/css/style.css">
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
  <script type="text/javascript" src="assets/js/jquery.fullPage.js"></script>
  <script type="text/javascript" src="assets/js/less.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

  <script type="text/javascript">
    $(document).ready(function() {
      $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        scrollingSpeed: 1500,
        loopHorizontal: false,
        slidesNavigation: true
      });
    });
  </script>
</head>
<body>
  <ul id="menu">
    <li data-menuanchor="firstPage"><a href="#firstPage">1</a></li>
    <li data-menuanchor="secondPage"><a href="#secondPage">2</a></li>
    <li data-menuanchor="3rdPage"><a href="#3rdPage">3</a></li>
    <li data-menuanchor="4thpage"><a href="#4thpage">4</a></li>
  </ul>
