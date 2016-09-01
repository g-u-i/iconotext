<?php snippet('header') ?>

  <div class="container jumbotron">
    <?php echo $page->header()->kirbytext() ?>
  </div>

  <div class="container maincontent">
    <?php echo $page->text()->kirbytext() ?>
  </div>

<?php snippet('footer') ?>
