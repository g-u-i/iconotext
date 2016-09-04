<?php if($p->hasChildren()): ?>
  <div class="container">
    <div class="columns columns-3">
      <?php foreach($p->children()->visible() as $c): ?>
        <div class="column">
          <a href="<?php echo $c->url()?>">
            <?php $cover = $c->image( basename($c->cover()->toFile()->url()) ) ?>
            <figure class="cover thumbnail">
                <?php echo thumb($cover, array('width' => 1920/3, 'height' => 1080/3, 'crop' => true) ) ?>
              <figcaption class="caption">
                <?php echo $c->header()->kirbytext() ?>
              </figcaption>

            </figure>
          </a>

        </div>
      <?php endforeach ?>
    </div>
  </div>
<?php endif ?>
