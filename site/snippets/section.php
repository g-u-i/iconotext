<div id="<?php echo $p->uri()?>" class="landing-section <?php echo $p->cssclasses() ?>">
  <div class="container-fluid jumbotron">
    <div class="container col-sm-offset-2 col-sm-8">
      <?php echo $p->header()->kirbytext() ?>
    </div>
  </div>
  <div class="container maincontent">
    <?php echo $p->text()->kirbytext() ?>
    <?php snippet('childs', array('p' => $p)) ?>
  </div>

</div>
