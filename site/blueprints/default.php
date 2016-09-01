<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: true
files: true
  sortable: true
  fields:
    caption:
      label: Légendes des images dans le diaporama
      type: textarea
fields:
  title:
   label: Titre
   type:  text
   width: 3/4
  cssclasses:
   label: Classes CSS
   help: ne pas modifier
   type:  text
   width: 1/4
  header:
   label: Chapeau
   type:  textarea
  text:
   label: Texte
   type:  textarea
   size:  large
