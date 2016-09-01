<!DOCTYPE html>
<html lang="en">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
  <title>Iconotexte — <?php echo $page->title()->html()?></title>
  <?php echo css('assets/css/screen.css') ?>
</head>
<body id="body" class="tpl-<?php echo $page->template() ?>">
  <?php snippet('navbar') ?>
