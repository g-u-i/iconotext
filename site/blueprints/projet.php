<?php if(!defined('KIRBY')) exit ?>

title: Projet
pages: false
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
   width: 1/2

  header:
   label: Chapeau
   type:  textarea
   width: 1/2

  context:
   label: Contexte
   type:  textarea
   width: 1/2

  conclusion:
   label: Bilan
   type:  textarea
   width: 1/2

  gallerylink:
    label: Projet en ligne
    help:  ex. flickr.com/…
    type:  url
    width: 1/2

  orderlink:
    label: Lien commande
    help:  ex. lulu.com/…
    type:  url
    width: 1/2

  cover:
      label: Aperçu projet
      type:  selector
      mode:  single
      autoselect: first
      types:
          - image
  preview:
      label: Illustrations
      type:  selector
      mode:  multiple
      types:
          - image

  pdf:
      label: Version PDF
      type:  selector
      mode:  single
      autoselect: first
      filter: /\.((pdf))/i

  sourceiconotext:
      label: Fichier source iconotexte
      type:  selector
      mode:  multiple
      autoselect: first
      filter: /\.((iconotext))/i
