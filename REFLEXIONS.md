# Réflexions

## Mémorisation

Comment mémoriser toutes les notes ? Pour le moment, elles sont écrites mais sont aussitôt oubliées. On pourrait bien sûr parcourir chaque portée pour connaitre ses notes, mais bon…
Faut-il les ranger par snap. Par exemple, les notes de la première portée seraient rangées ainsi :

~~~javascript

portee1.snaps = {
  1: [liste des notes],
  2: [liste des notes]
}

~~~

Avec un pointeur par portée qui conserve toujours la position de la note courante de la portée.

Ou alors on se fiche des snaps (qui sont de toutes façons conservés indirectement avec les notes) et l'on conserve simplement les notes d'une portée dans l'ordre de leur création (note : difficulté de la suppression, dans ce cas)

OU ALORS, tout simplement, un pointeur général sur une liste de toutes les notes enregistrées :

* on enregistre toutes les notes dans une liste unique (quelle que soit la portée)
* un pointeur se place toujours à la fin
* avec le pointeur, on peut choisir un autre élément de liste (remonter)
* on peut modifier, supprimer, (insérer ?) 
* dès qu'on ajoute une nouvelle note (comment ? certainement avec les lettres a-g), on l'ajoute à la liste et le pointeur repart à la fin

* Comment déplace-t-on le pointeur ? Il faut que ce soit toujours la même chose (par exemple J et L, comme pour une lecture, ou alors avec les flèches, par exemple plutôt ALT-ARROW pour déplacer le snap et )
  * ALT ARROW L/R => déplace le prochain snap
  * MAJ ARROW L/R => déplace la note sur le précédent/prochain snap
  * ARROW L/R => sélectionne la prochaine/précédente note 
