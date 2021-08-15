### Réflexion sur une application navigateur pour les cours d’analyse musicale

Je voudrais pouvoir faire ça, par exemple :

* taper les notes sur le clavier maitre et les faire apparaitre sur une partition simple, en accord
* taper les notes sur le clavier maitre et les faire apparaitre sur une parition simple, en continu
* déplacer les notes à différentes octaves avec Maj + flèche haut/bas (pour ranger les accords)
* ajouter des altérations ou les enlever d’une simple touche, par exemple avec les flèches
* donc on aurait pour les flèches :
  * maj + flèche haut/bas => changement d’octave
  * alt + flèche haut/bas => ajout ou retrait d’altération
  * flèche haut/bas => déplacement de la note en haut ou en bas
  * flèche gauche/droite => déplacement sur les “snaps”
* pouvoir changer rapidement le zoom, pour un affichage toujours maximal (cmd + ou cmd -, par grands pas, avec la propriété CSS zoom)



### Principes

* pour le moment entrée des notes par le clavier de l’ordinateur, de A à G,
* un “snap” très large, composé de seulement 4 snaps (enchainement d’accord), 8 snaps (gamme simple) ou 32 (mélodie complète)
* pas de gestion des rythmes (trop compliqué)
* conservation de la dernière octave