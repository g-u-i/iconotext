<?php snippet('header') ?>
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

    	<?php foreach($pages->visible() as $page): ?>
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
		              	<img src="<?php echo thumb($image, array('width' => 1280, 'height' => 720))->url(); ?>" alt="<?php echo $image->title()->html() ?>">
		            </div>
		        <?php endforeach ?>
	    	</div>
    	<?php endforeach ?>
<?php snippet('footer') ?>
