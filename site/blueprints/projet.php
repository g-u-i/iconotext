<?php if(!defined('KIRBY')) exit ?>

title: Projet
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
  header:
   label: Chapeau
   type:  textarea
  context:
   label: Contexte
   type:  textarea
  conclusion:
   label: Bilan
   type:  textarea
  link:
   label: Lien vers le projet
   type:  url
   width: 1/3
  attachments:
      label: Post Attachments
      type:  selector
      mode:  multiple
      types:
          - all
