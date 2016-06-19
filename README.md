# iconotexte
*Dispositif pédagogique d’exploration du lien texte / image*


![workflow](https://docs.google.com/drawings/d/1DnGQKQQD9bKBrDW_nD3t1e6rezmi3iVaevDZ2Tb1ICI/pub?w=1487&amp;h=1080)

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

- ajout de texte par **copier coller**
- importation de **fichiers** .txt, .md (texte brut)
- **dossier projet**
- ajout d'image dans la zone d'éditeur (cf. schéma éditeur)
  - fichier local
  - url
  - webcam


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



2. **partage** des collections d’images du groupe
  - **agencer** les séquences d’images ensemble
  - comparer visuellement l’interprétation d’un même **fragment de texte** par **plusieurs groupes**.

3. **publication** d’une version stabilisée
  - exportation en PDF (en vue d’une impression à la demande )
  - exportation en d’un site web statique

****
Réalisé par Benoît Verjat et Nicolas Couturier, production Cneai,
CC BY-NC-SA 4.0, &&, Cneai, 2016, France
