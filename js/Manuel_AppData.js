'use strict';
/**
 * Module fonctionnant de paire avec Manuels.js, propre à 
 * l'application, qui définit l'aide
 * 
 */

const ManuelData = [
  {
      operation: "Ajouter une note sur la portée"
    , procedure:["Choisir s'il le faut la portée à l'aide des touches HOME et FIN", "jouer une des lettres notes : c, d, e, f, g, a, b", "affiner son altération avec les lettres u (dièses), o (bémols) et i (bécarre)", "ajuster sa hauteur si erreur avec les flèches haut et bas."]
    , precision:"En mode PHRASE, le curseur passe aussitôt à la position suivante. En mode ACCORD, il reste ne place."
  }
]

const ManuelShortcutsData = [
  {
      operation: 'Repasser à la table d’analyse'
    , shortcut:  '⇧T'
    , precision: "Seulement lorsque Staves est “incrustée” dans la table d'analyse."
  }
]
