<?php snippet('header') ?>
    <div class="text">
      <h1><?php echo $page->title()->html() ?></h1>
      <?php echo $page->text()->kirbytext() ?>
    </div>
<?php snippet('projects') ?>