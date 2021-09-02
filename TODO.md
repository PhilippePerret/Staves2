# TODO Remontée

* [BUG] Rendre impossible de mettre la même note au même endroit
  (mais comment gérer, alors, le fait de mettre deux DO à l'octave, en voulant
  mettre le deuxième à l'octave => aide ? "pour mettre deux notes à l'octave => mettre la première d'abord, car on ne peut pas mettre deux fois la même note" OU PLUTÔT: message quand on fait l'erreur)
* Préférence pour respecter la hauteur de la note MIDI (sinon, elle sera placée en respectant la règle de la proximité de quarte)

# TODO liste


* Traiter le passage automatique à la portée dessus/dessous en mode piano quand on passe le do médian

* [BUG] Affiner le cas où la note a été décalée (comme quand on place un LA près un SOL au même octave sur le même accord) et où on lui place une altération (elle se déplace encore plus, alors qu'elle ne devrait pas bouger)
* [BUG] Si on écrit LA puis SOL au même octave en accord, le LA devrait se décaler (comme il le fait lorsqu'on l'écrit après)


* Panneau avec tous les raccourcis (c'est Manuel.js qui s'en charge, rien n'est à faire, normalement, que modifier Manuel.js dans Table d'analyse et le reporter ici.)

* Voir si Staves est pilotable par MIDI
