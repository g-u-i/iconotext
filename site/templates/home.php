<?php snippet('header') ?>

  <?php foreach($site->children()->visible() as $item): ?>
    <?php snippet('section', array('p' => $item)) ?>
  <?php endforeach ?>

<?php snippet('footer') ?>
