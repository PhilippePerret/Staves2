# TODO Remontée

* Essayer les "raccourcis doubles" (gérés par onkeydown)

* [BUG] Voir le problème avec les couleurs
* [BUG] Je ne peux plus déplacer les notes avec MAJ FLÈCHE

# TODO liste

* Préférence : ne pas jouer la note MIDI à l'écriture
  => Documenter

* Jouer le son de la note quand on la rentre avec les touches aussi
  -> Préférence ? -> mettre en place -> documenter

* Traiter le passage automatique à la portée dessus/dessous en mode piano quand on passe le do médian OU quand on est en mode MIDI qui respecte les hauteurs

* [BUG] Affiner le cas où la note a été décalée (comme quand on place un LA près un SOL au même octave sur le même accord) et où on lui place une altération (elle se déplace encore plus, alors qu'elle ne devrait pas bouger)
* [BUG] Si on écrit LA puis SOL au même octave en accord, le LA devrait se décaler (comme il le fait lorsqu'on l'écrit après)


* Panneau avec tous les raccourcis (c'est Manuel.js qui s'en charge, rien n'est à faire, normalement, que modifier Manuel.js dans Table d'analyse et le reporter ici.)

* Voir si Staves est pilotable par MIDI
