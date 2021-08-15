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
 */
buildNote(params){
  var n = new Note({type:'noire', portee: this, note: params.note, octave: 3})
  n.build() // l'ajoute à Notes.items
  this.notes || (this.notes = [])
  this.notes.push(n)
  Current.note = n
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
