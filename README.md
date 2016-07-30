# iconotexte
*éditeur texte/image pédagogique*

![workflow](https://docs.google.com/drawings/d/1DnGQKQQD9bKBrDW_nD3t1e6rezmi3iVaevDZ2Tb1ICI/pub?w=1487&amp;h=1080)

- créer une **séquence** en composant texte et images **simultanément** avec un rendu visuel adapté  
- ajouter des **métadonnées** a la séquence (titre, crédits, crédits de l'application …)
- exporter un version **publiable** (`pdf`,`jpegs`) dans une mises en formes adapté et obtenir une **prévisualisation**
- sauvegarder **en local** le projet formaté (séquence + métadonnées)
- obtenir de l'**aide** directement dans l'interface

## editeur texte/image
![editor](https://docs.google.com/drawings/d/1m0j2WogX8TcO5tFsxM4WA5Giu4KY-Km8_XMeXl8Lv_E/pub?w=1440&h=1080)

- ajouter de texte
  - par **copier coller**
  - importer des **fichiers** `.txt`, `.md` (texte brut)
- ajouter depuis l'éditeur une image depuis
  - fichier
  - webcam
  - url
- importer un **dossier projet**
- appliquer des enrichissements typographiques (**gras**, *italique*, lien hypertexte)
- importer par **drag and drop** ou par **file picker**

## publication / preview
![layout](https://docs.google.com/drawings/d/1r_PIYdG4upb-EbJeBoTRgjTzeSvWhMGbAiCFakmTFFI/pub?w=1440&h=1080)
![preview](https://docs.google.com/drawings/d/1i9mxHdDs-fzYR27bPHUzNfkN_ByIbR9a4JYI89EenxI/pub?w=1440&h=1080)

- exporter un **diaporama**
  - texte est incrusté dans l'image
  - exporter une séquence `jpg`
- exporter un **livret** (une version imprimée et reliable)
  - choisir entre 2 options de mise en page
  - ajouter d'une **pagination**
  - choisir le type de **support** (A3, A4, A5 …)
  - choisir la **reliure** ou plateforme de **print on demand** ciblée
  - exporter en `PDF`
- obtenir un package `.zip` du **dossier projet**

![formes](https://docs.google.com/drawings/d/1QSAeSuQCLVLv-YDgqg6hA_0DVQAorybSdrHL1wpK1o8/pub?w=1440&h=1080)

### sauvegarde / exportation

Sauvegarder les changements dans une **dossier projet** contenant :
- **séquence texte/image** en markdown
- **images** convertis en `jpg` (max `2500px`), les `gif` restent bruts et sont convertis au moment de l'exportation
- bloc **métadonnées** en `yml` au début du fichier

exemple :
```
title: mon titre
date: avril 2019
text_source: le bon la brute …
image_source: BNF
credits: terminale S, lycée jean prouvé (jean, paul, yvan, jojo)
free_text: mon texte libre

----
sequence:
![texte sur l'image en mode sous titre](images/img34.jpg)
ligne de texte seul
![](images/img52.jpg)

(…)
----
```

### settings / divers
- redimensionner les images `true|false`
- sélectionner langue de l'interface `fr|en`
- longeur max paragraphe `int`

### lancer l'application (environnement de développement)
- cloner le dépôt: `git clone git@github.com:g-u-i/iconotext`
- installer les dépendances: `npm i`
- lancer l'application en [HMR](https://webpack.github.io/docs/hot-module-replacement.html): `npm run dev`
- packager l'application pour les différents OS: `npm run package-all` (*[disclaimer pour packager pour Windows depuis un autre OS](https://github.com/electron-userland/electron-packager#building-windows-apps-from-non-windows-platforms)*)

****
Réalisé par Benoît Verjat et Nicolas Couturier, production Cneai,
CC BY-NC-SA 4.0, &&, Cneai, 2016, France
