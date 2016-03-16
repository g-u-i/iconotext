	<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Iconotexte</title>

	<link rel="stylesheet" type="text/css" href="assets/css/jquery.fullPage.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
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
				scrollingSpeed: 1500
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
    <div id="fullpage">
    	<div class="section" id="section0">
    		<h1>Iconotexte</h1>
    	</div>
    	<?php foreach(page('projects')->children()->visible() as $page): ?>
		    <div class="section">
		    	<div class="slide ">
			    	<svg height="100" width="100">
						<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="white" />
						<text x="30" y="70" font-size="55" fill="black" ><?php echo $page->num() ?></text>
					</svg>
					<div class="row">
						<div class="col-md-offset-2 col-md-8">
							<h1><?php echo $page->title()->kirbytext() ?></h1>
							<p><?php echo $page->subtitle()->kirbytext() ?></p>
						</div>
					</div>
				</div>
		        <?php foreach($page->images()->sortBy('sort', 'asc') as $image): ?>
		            <div class="slide">
		            	<h1 class="sub">Ici une légende</h1>
		              	<img src="<?php echo $image->url() ?>" alt="<?php echo $page->title()->html() ?>">
		            </div>
		        <?php endforeach ?>
	    	</div>
    	<?php endforeach ?>






        <div class="section">
	        <div class="slide ">
	        	<svg height="100" width="100">
				  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="white" />
				  <text x="30" y="70" font-size="55" fill="black" > 2 </text>
				</svg>
	        	<h1> Un outil pour éditer </h1>
				<p>Placer une consigne, une utilisation possible de l'outil.</p>
	        	<img src="img/01.JPG">
	        </div>
        	<div class="slide">
        		<div class="row titre" style="margin-top:0;">
    				<h1>Placer un titre</h1>
					<p>Placer une consigne, une utlisation possible de l'outil.</p>
				</div>
				<div class="container">
		        	<div class="row">
		        		<div class="col-md-6">
	        				Des images sur une slide
	        				<img src="img/01.JPG">
		        		</div>
		        		<div class="col-md-6">
		        			Avec bootstrap
		        			<img src="img/02.JPG">
		        		</div>
		        	</div>
		        </div>
	        </div>
		    <div class="slide">
				<img src="img/03.JPG">
			</div>
			<div class="slide">
				<p class="description">Ici une légende</p>
				<img src="img/04.JPG">
			</div>
			<div class="slide">
				<img src="img/05.JPG">
			</div>
	    </div>
    <div>	
</body>
</html>
