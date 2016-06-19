# iconotexte
*Dispositif pédagogique d’exploration du lien texte / image*


![workflow](https://docs.google.com/drawings/d/1DnGQKQQD9bKBrDW_nD3t1e6rezmi3iVaevDZ2Tb1ICI/pub?w=1487&amp;h=1080)
![editor](https://docs.google.com/drawings/d/1m0j2WogX8TcO5tFsxM4WA5Giu4KY-Km8_XMeXl8Lv_E/pub?w=1440&h=1080)
![preview](https://docs.google.com/drawings/d/1i9mxHdDs-fzYR27bPHUzNfkN_ByIbR9a4JYI89EenxI/pub?w=1440&h=1080)
![layout](https://docs.google.com/drawings/d/1r_PIYdG4upb-EbJeBoTRgjTzeSvWhMGbAiCFakmTFFI/pub?w=1440&h=1080)

## fonctionnalités

1. importer du texte
2. glisser des images
3. obtenir une prévisualisation du resultat et sélectionner des mises en formes
  1. diaporama "plein écran"
  2. livret
    1. 2 option de mise en page
    2. format papier
    3. reliure / plateforme de print on demand ciblée

4. entrer des informations sur le projet (titre, crédits …)

### importations

- ajouter de texte
  - par **copier coller**
  - importer des **fichiers** .txt, .md (texte brut)
- ajouter des images depuis l'éditeur (cf. schéma éditeur)
  - fichier local
  - url
  - webcam
- importer un projet existant (cf. **dossier projet**)

Les importation se font par **drag and drop** ou par **file picker**.

### Stockage local et exportation

Les changements sont répercuté dans le **dossier projet** qui contient :

- la séquence texte/image en markdown avec un bloc d'introduction qui contient les métadonnées :
  ex.
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
  ```
- les images (en jpg dans un dossier séparé)


****
Réalisé par Benoît Verjat et Nicolas Couturier, production Cneai,
CC BY-NC-SA 4.0, &&, Cneai, 2016, France
