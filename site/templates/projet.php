<?php snippet('header') ?>

    <?php $cover = $page->image( basename($page->cover()->toFile()->url()) ) ?>
    <?php $preview = $page->image( basename($page->preview()->toFile()->url()) ) ?>

  <div class="container jumbotron">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-5">
        <?php echo thumb($cover, array('width' => 900, 'height' => 900) ) ?>
      </div>

      <div class="col-sm-5 header"><?php echo $page->header()->kirbytext() ?></div>
    </div>
  </div>

  <div class="container ">
    <div class="col-sm-offset-6 col-sm-5">
      <?php echo $page->context()->kirbytext() ?>
      <?php echo $page->conclusion()->kirbytext() ?>
    </div>
  </div>

  <div class="container download">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-5">
        <?php echo thumb($preview, array('width' => 900, 'height' => 900) ) ?>
        <a class="btn btn-default" target="_blank" href="<?php echo $page->orderlink() ?>" role="button">Commander un exemplaire</a>
        <a class="btn btn-default" target="_blank" href="<?php echo $page->gallerylink() ?>" role="button">Consulter en ligne</a>

        <a class="btn btn-default" target="_blank" href="<?php echo $page->sourceiconotext()->toFile()->url() ?>" role="button">Télécharger la source</a>
        <a class="btn btn-default" target="_blank" href="<?php echo $page->pdf()->toFile()->url() ?>" role="button">Télécharger le pdf</a>
      </div>
    </div>
  </div>


<?php snippet('footer') ?>
