# iconotexte
*éditeur texte/image pédagogique*

![workflow](https://docs.google.com/drawings/d/1DnGQKQQD9bKBrDW_nD3t1e6rezmi3iVaevDZ2Tb1ICI/pub?w=1487&amp;h=1080)

- produire une séquence en composant texte et images simultanément  
- obtenir une prévisualisation diverses mises en formes
- entrer des informations sur le projet (titre, crédits …)

## editeur texte/image
![editor](https://docs.google.com/drawings/d/1m0j2WogX8TcO5tFsxM4WA5Giu4KY-Km8_XMeXl8Lv_E/pub?w=1440&h=1080)

- ajouter de texte
  - par **copier coller**
  - importer des **fichiers** .txt, .md (texte brut)
- ajouter des images depuis l'éditeur (cf. diagramme)
  - fichier local
  - url
  - webcam
- importer un projet existant (cf. **dossier projet**)
- importer par **drag and drop** ou par **file picker**

## publication / preview
![layout](https://docs.google.com/drawings/d/1r_PIYdG4upb-EbJeBoTRgjTzeSvWhMGbAiCFakmTFFI/pub?w=1440&h=1080)
![preview](https://docs.google.com/drawings/d/1i9mxHdDs-fzYR27bPHUzNfkN_ByIbR9a4JYI89EenxI/pub?w=1440&h=1080)

- créer un diaporama
  - intégrer le texte à l'image
  - exporter une séquence jpg

- créer un livret (une version imprimée et reliée)
  - choisir entre 2 options de mise en page
  - ajouter d'une pagination
  - choisir le format support (A3, A4, A5 …)
  - choisir la reliure ou plateforme de print on demand ciblée
  - exporter en PDF

- obtenir un package .zip du projet

### sauvegarde / exportation

Sauvegarder en temps réel mes changements dans une **dossier** contenant :
- la **séquence texte/image** en markdown
- les fichier **images** convertis en jpeg (gif bruts), max 2500px, dans un dossier séparé
- un bloc d'introduction avec les métadonnées du projet en yml

exemple :
```
title: mon titre
date: avril 2019
text_source: le bon la brute …
image_source: BNF
credits: jean, paul, yvan, jojo
free_text: mon texte libre

----

![texte sur l'image en mode sous titre](images/img34.jpg)
ligne de texte seul
![](images/img52.jpg)

(…)

```

### settings
- [true|false] redimensionner les images
- langue de l'interface

****
Réalisé par Benoît Verjat et Nicolas Couturier, production Cneai,
CC BY-NC-SA 4.0, &&, Cneai, 2016, France
