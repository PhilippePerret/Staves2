'use strict';

class Portee {
  constructor(pg){
    this.page = pg
  }

/**
 * Pour ajouter un objet à la portée
 */
add(o){ this.obj.appendChild(o) }

/**
 * Pour construire une note dans la portée
 * 
 * +params+
 *    note:     La note (a-g)
 *    octave:   [Optionnel] L'octave (envoyé MIDI)
 */
buildNote(params){
  // console.log("Params au départ : ", params)
  // On doit trouver l'octave en fonction de la note courante
  params.octave || Object.assign(params, {octave: this.findOctaveForNote(params.note)})

   // On doit trouver la portée en fonction de la note et des préfé-
  // rences
  if ( Preferences.data['change_staff_on_c_median']){
    console.info("TODO On doit peut-être changer de portée")
  }
  this.notes || (this.notes = [])
  Object.assign(params, {portee: this, id: this.notes.length, left: Current.snap})
  // console.log("Données pour construire la note : ", params)
  var n = new Note(params)
  if ( this.noteAlreadyExists(n) ) {
    //
    // La note existe déjà
    //
    erreur(ERRORS['note_already_exists'])
  } else {
    //
    // Si la note n'existe pas, on peut la construire
    //
    n.build() // l'ajoute à Notes.items
    this.notes.push(n)
    Current.note = n
  }
}

/**
 * Retourne TRUE si la note +note+ {Note} existe déjà
 * 
 */
noteAlreadyExists(note){
  // console.log("Note à comparer :", note)
  var isFound = false
  for ( var n of this.notes ) {
    // console.log("Note comparée : ", n)
    if ( note.note != n.note ){ 
      // console.log("Note différente (%s/%s)", note.note, n.note)
      continue ;
    }
    if ( note.left != n.left ){
      // console.log("Left différent (%s/%s)", note.left, n.left)
      continue ;
    }
    if ( note.octave != n.octave ) {
      // console.log("Octave différente (%s/%s)", note.octave, n.octave)
      continue ;
    }
    if ( note.alteration != n.alteration ){ 
      // console.log("Altération différente (%s/%s)", note.alteration, n.alteration)
      continue ;
    }
    // On l'a trouvée
    // console.log("TROUVÉE !")
    isFound = true
    break
  }
  return isFound
}

/**
 * Cherche l'octave pour la note +note+ en fonction des préférences
 * 
 * @return {Number} L'octave
 */
findOctaveForNote(note){
  var octave = 3
  if ( Current.note && Pref['same_note_pitch'] ){
    var dnote = {portee:Current.note.portee, note:note}
    var candidats = [
        new Note(Object.assign(dnote, {octave:Current.note.octave - 1}))
      , new Note(Object.assign(dnote, {octave:Current.note.octave    }))
      , new Note(Object.assign(dnote, {octave:Current.note.octave + 1}))
    ]
    var dist = 10000 ; // distance 
    var candidat ; // note la plus proche
    candidats.forEach(n => {
      if ( Math.abs(Current.note.top - n.top) < dist ){
        dist = Math.abs(Current.note.top - n.top)
        candidat = n
      }
    })
    octave = candidat.octave
  }
  return octave
}

  /**
   * Pour modifier la portion au-dessus de la portée (pour ajouter
   * des notes supplémentaires par exemple)
   */
  augmenteTop(){
    this.top = (this.top || 0) + 20
    this.obj.style.backgroundPosition = `0 ${px(this.top)}`
  }

/**
 * Construire la portée
 */
build(){
  this.obj = document.createElement('DIV')
  this.obj.className = 'portee'
  this.page.obj.appendChild(this.obj)
}


/**
 * Pour changer de clé
 */
setKeyTo(key){
  this.key = key
  this.removeKey()
  var img = DCreate('IMG', {src: `img/key-${key}.svg`, class:`${key}-key key`})
  this.obj.appendChild(img)
}
removeKey(){
  this.obj.querySelector('.key') && this.obj.querySelector('.key').remove()
}

/**
 * La position de la portée dans le div permet de définir la hauteur
 * min et max pour placer des lignes supplémentaires
 *
 */
get top(){
  return this.backgroundPosition
}
setTop(v){this.obj.style.top = px(v)}

get bottom(){
  return this.backgroundPosition + 4 * INTERLIGNE
}
 
setFond(){
  if ( !this.obj.querySelector('.lignes') ){
    var i = DCreate('IMG', {src:'img/lignes.jpg', class:'lignes'})
    this.obj.appendChild(i)
  }
  return this
}
unsetFond(){
  this.removeKey()
  this.obj.querySelector('.lignes') && this.obj.querySelector('.lignes').remove()
  return this
}

/**
 * Règle la position des lignes (qui peut varier s'il y a beaucoup
 * de notes supplémentaires au-dessus)
 * 
 */
setBackgroundPosition(){
  this.obj.style.backgroundPosition = `0px ${this.backgroundPosition}px`
}

get backgroundPosition(){return this._bgposition || 70}
set backgroundPosition(v){ this._bgposition = v}

}// class Portee
