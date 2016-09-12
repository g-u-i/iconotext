<?php snippet('header') ?>

    <?php
      $cover = $page->image( basename($page->cover()->toFile()->url()) );

      $filenames = $page->preview()->split(',');
      if(count($filenames) < 2) $filenames = array_pad($filenames, 2, '');
      $previewFiles = call_user_func_array(array($page->files(), 'find'), $filenames);

    ?>

  <div class="container jumbotron">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-5">
        <?php echo thumb($cover, array('width' => 600, 'height' => 900) ); ?>
      </div>

      <div class="col-sm-5 header"><?php echo $page->header()->kirbytext() ?></div>
    </div>
  </div>

  <div class="container ">
    <div class="col-sm-offset-2 col-sm-4">
        <?php if(!$page->sourceiconotext()->isEmpty() || !$page->pdf()->isEmpty()): ?>
        <?php endif ?>

        <?php if(!$page->orderlink()->isEmpty() ): ?>
          <h4>commander</h4>

          <a class="btn btn-default" target="_blank" href="<?php echo $page->orderlink() ?>" role="button">
            <span class="glyphicon glyphicon glyphicon-book" aria-hidden="true"></span> exemplaire papier
          </a>
        <?php endif ?>

        <?php if(!$page->gallerylink()->isEmpty() ): ?>
          <h4>consulter</h4>
          <a class="btn btn-default" target="_blank" href="<?php echo $page->gallerylink() ?>" role="button">
            <span class="glyphicon glyphicon-tent" aria-hidden="true"></span> page du projet
          </a>
        <?php endif ?>


        <?php if(!$page->sourceiconotext()->isEmpty() || !$page->pdf()->isEmpty()): ?>
          <h4>télécharger</h4>
        <?php endif ?>

        <?php if(!$page->sourceiconotext()->isEmpty() ): ?>
          <a class="btn btn-default" target="_blank" href="<?php echo $page->sourceiconotext()->toFile()->url() ?>" role="button">
           <span class="glyphicon glyphicon-film" aria-hidden="true"></span> source .iconotexte
          </a>
        <?php endif ?>

        <?php if(!$page->pdf()->isEmpty() ): ?>
          <a class="btn btn-default" target="_blank" href="<?php echo $page->pdf()->toFile()->url() ?>" role="button">
            <span class="glyphicon glyphicon-file" aria-hidden="true"></span>  PDF
          </a>
        <?php endif ?>

    </div>
    <div class="col-sm-5">
      <?php echo $page->context()->kirbytext() ?>
      <?php echo $page->conclusion()->kirbytext() ?>

    </div>
  </div>

  <div class="container jumbotron">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-6">
        <?php foreach($previewFiles as $file): ?>
          <p><?php echo thumb($file, array('width' => 600, 'height' => 900) ) ?></p>
        <?php endforeach?>
      </div>

      <div class="col-sm-5 ">
      </div>
    </div>
  </div>

  <div class="container download">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-5">

      </div>
    </div>
  </div>


<?php snippet('footer') ?>
