<?php snippet('header') ?>

  <div class="container jumbotron">
    <?php echo $page->header()->kirbytext() ?>
  </div>

  <div class="container maincontent">
    <?php echo $page->text()->kirbytext() ?>
  </div>

    <?php echo $page->context()->kirbytext() ?>
    <?php echo $page->conclusion()->kirbytext() ?>


<?php snippet('footer') ?>
