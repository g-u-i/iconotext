<?php snippet('header') ?>


  <div class="container-fluid ">
    <h1 class="navbar-fixed-top logo"><?php echo  $page->title()->html()?></h1>
  </div>


  <div class="container-fluid jumbotron">

    <div class="lead col-sm-8 col-sm-offset-2"><?php echo  $page->subtitle()->kirbytext()?></div>

  </div>
  <div class="container">
    <?php echo $page->text()->kirbytext() ?>
  </div>


<?php snippet('footer') ?>
