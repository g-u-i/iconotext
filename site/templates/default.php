<?php snippet('header') ?>
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
		            	<h1 class="sub"><?php echo $image->caption(); ?></h1>
		              	<img src="<?php echo $image->url() ?>" alt="<?php echo $image->title()->html() ?>">
		            </div>
		        <?php endforeach ?>
	    	</div>
    	<?php endforeach ?>

    <script type="text/javascript" src="assets/js/all.min.js"></script>	
    <script type="text/javascript" src="assets/js/icono.js"></script>	
</body>
</html>
