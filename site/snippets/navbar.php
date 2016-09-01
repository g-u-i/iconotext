<nav id="nav" class="navbar navbar-default navbar-fixed-top navbar-center">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#<?php echo $site->children()->visible()->first()->uri()?>"><img src="/assets/images/logo-mini.svg"></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" >
      <ul class="nav navbar-nav">
          <?php foreach($site->children()->visible() as $section): ?>
            <li><a href="#<?php echo $section->uri()?>"><?php echo $section->title()?></a></li>
          <?php endforeach ?>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <a class="btn btn-default" href="#" role="button">télécharger</a>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
