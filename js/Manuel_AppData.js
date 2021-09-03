'use strict';
/**
 * Module fonctionnant de paire avec Manuels.js, propre à 
 * l'application, qui définit l'aide
 * 
 */

const Ouvrir_preferences = "Ouvrir les préférences (⇧P),"

const ManuelData = [
  {
      operation: "Ajouter une note sur la portée"
    , procedure:["Choisir s'il le faut la portée à l'aide des touches HOME et FIN", "jouer une des lettres notes : c, d, e, f, g, a, b", "affiner son altération avec les lettres u (dièses), o (bémols) et i (bécarre)", "ajuster sa hauteur si erreur avec les flèches haut et bas."]
    , precision:"En mode PHRASE, le curseur passe aussitôt à la position suivante. En mode ACCORD, il reste ne place."
  }
, {
      operation: "Destruction de toutes les notes"
    , procedure:["Jouer le raccourci ⇧⌫."]
    , precision: "Cela remet aussi le curseur au départ."
  }
, {
      operation: "Ne plus écrire les notes provenant du MIDI"
    , procedure: ["Cliquer sur le bouton “MIDI ON” au pied de l'interface."]
    , precision: "Si le bouton affiche “MIDI OFF”, c'est que les notes sont déjà interrompu."
  }
, {
      operation: "Écrire les notes MIDI en conservant leur octave"
    , procedure: [Ouvrir_preferences, "Cocher la case “Garder l'octave des notes MIDI”."]
    , precision: "Si ce mode est désactivé, la note se place à l'octave normale, ou l'octave qui respecte le principe de proximité de quarte."
  }
, {
      operation: "Jouer le son de la note cliquée"
    , procedure: [Ouvrir_preferences, "cocher la case “Jouer la note sélectionnée ou cliquée”."]
    , precision: "Pour ne pas l'entourer, cocher la case “Ne pas entourer la note cliquée”."
  }
, {
      operation: "Jouer la note sélectionnée"
    , procedure: ["Sélectionner la note avec les flèches", "jouer la touche ENTRÉE."]
    , precision: "Pour que ça fonctionne, il faut que la case “Jouer la note sélectionnée ou cliquée” soit cochée."
  }
, {
      operation: "Pour ne pas entourer la note cliquée"
    , procedure: [Ouvrir_preferences, "cocher la case “Ne pas entourer la note cliquée”."]
    , precision: "Pour émettre le son de la note, cocher la case “Jouer la note sélectionnée ou cliquée”"
  }

]

const ManuelShortcutsData = [

  {
      operation: 'Repasser à la table d’analyse'
    , shortcut:  '⇧T'
    , precision: "Seulement lorsque Staves est “incrustée” dans la table d'analyse."
  }

, {
      operation: 'Bascule mode Phrase / mode Accord'
    , shortcut: 'm'
    , precision: "“M” comme “Mode”"
  }
, {
      operation: 'Bascule Noire / Ronde'
    , shortcut: 'n'
    , precision: "“N” comme “Note”. Juste pour un affichage différent"
  }
, {
      operation: 'Bascule portée unique / duo / piano'
    , shortcut: 'p'
    , precision: '“P” comme “Portée”.'
  }
, {
      operation: "Bascule entre les différentes couleurs"
    , shortcut: 'k'
    , precision: "“K” comme “Kouleur” (sic). Cette couleur affecte l'anneau autour de la note"
  }
, {
      operation: "Bascule entre MIDI ON et MIDI OFF"
    , shortcut: '⌥m'
    , precision: "“M” comme MIDI bien sûr. Rappel : permet de jouer les notes sans qu'elles soient marquées."
  }
]
