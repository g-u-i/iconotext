<?php snippet('header') ?>
  <div class="container-fluid jumbotron">
    <div class="lead col-sm-8 col-sm-offset-2"><?php echo  $page->subtitle()->kirbytext()?></div>
  </div>
  <div class="container maincontent">
    <?php echo $page->text()->kirbytext() ?>
  </div>
<?php snippet('footer') ?>
