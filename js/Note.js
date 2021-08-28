'use strict'
/**
  * Classe pour une note quelconque
  */

const INTERLIGNE = 52
const NOTE_ECART = INTERLIGNE / 2
// const TOP_FA = 235 // hauteur de départ du FA
const TOP_FA = 232 // hauteur de départ du FA
// Hauteur en pixel d'une octave sur une portée
const OCTAVE_HEIGHT = NOTE_ECART * 7

// Espace pour une altération (en pixels)
const ALTER_WIDTH = 54
// Position de la note par rapport au "left" (snap courant)
const NOTE_OFFSET = 1.5 * ALTER_WIDTH


class Note {

constructor(data){
  this.data       = data
  this.portee     = data.portee
  this.note       = data.note
  this.octave     = data.octave
  this.alteration = data.alteration
}

/**
 * Pour remonter la note
 */
up(e){
  if ( e.shiftKey ) {
    ++ this.octave
  } else {
    this.getNoteUp()
  }
  this.update()
}

/**
 * Pour descendre la note
 */
down(e){
  if ( e.shiftKey ) {
    -- this.octave
  } else {
    this.getNoteDown()
  }
  this.update()
}

/**
 * Ajouter les altérations
 */
diesize(){        this.setAlteration('diese')}
doubleDiesize(){  this.setAlteration('double-diese')}
bemolize(){       this.setAlteration('bemol')}
doubleBemolize(){ this.setAlteration('double-bemol')}
becarrize(){      this.setAlteration('becarre')}
noAlterize(){     this.setAlteration(null)}

setAlteration(name){
  this.alteration = name
  this.update()
}

// Monter la note d'un degré
getNoteUp(){
  let idx = this.indexNote
  this.note == 'b' && ( ++ this.octave )
  this.note = 'defgabc'.substring(idx, idx + 1)
}

// Descendre la note d'un degré
getNoteDown(){
  let idx = this.indexNote
  if ( this.note == 'c' ) -- this.octave ;
  this.note = 'bcdefga'.substring(idx, idx + 1)
}

// Déplacer la note au pas suivant
moveToNextSnap(e){
  Snap.set(this.left += SNAP_WIDTH)
  // if ( this.left == Current.snap) Snap.next(e)
  // this.left = Current.snap
  this.update()
}

// Déplacer la note au pas précédent
moveToPrevSnap(e){
  Snap.set(this.left -= SNAP_WIDTH)
  // if ( this.left == Current.snap) Snap.previous(e)
  // this.left = Current.snap
  this.update()
}

// Le degré 0-start de la note
get indexNote(){
  return 'cdefgab'.indexOf(this.note)
}

/**
 * Actualise la note
 * 
 */
update(){
  this._top           = null
  this._ligsupleft    = null
  this._alterwidth    = null
  this.obj.style.top  = px(this.top)
  this.obj.style.left = px(this.noteLeft)
  if ( this.anneau ) {
    this.anneau.style.top   = px(this.anneauTop)
    this.anneau.style.left  = px(this.anneauLeft)
  }
  this.graveAlteration()
  this.graveLignesSup()
}

setSelected()   {this.obj.classList.add('selected')}
unsetSelected() {this.obj.classList.remove('selected')}


/**
 * Le left de la note, en fonction du fait qu'il y ait ou non une
 * altération
 */
get noteLeft(){
  return this.left + NOTE_OFFSET
}
/**
 * Le left des notes supplémentaires, en fonction du fait qu'il y a
 * ou non des altérations
 */
get ligneSupLeft(){
  return this._ligsupleft || (this._ligsupleft = this.noteLeft - 16)
}


/**
 * Construction de la note
 * 
 */
build(){
  // this.left = Current.snap
  let img = DCreate('IMG', {src: `img/note-${this.type}.svg`, class:`note ${this.type}`})
  this.obj = img
  this.portee.add(this.obj)
  this.left = Current.snap
  this.update()
  Current.isModePhrase && Current.setNextSnap(this.left)
  Notes.add(this)
  this.observe()
}

/**
 * Observe la note
 */
observe(){
  this.obj.addEventListener('click', this.drawAnneau.bind(this))
}

/**
 * Permet de "pointer" la note, c'est-à-dire de l'entourer
 */
drawAnneau(e){
  this.buildAnneau()
}
removeAnneau(e){
  this.anneau.removeEventListener('click', this.removeAnneau.bind(this))
  this.anneau.remove()
  this.anneau = null
}

/**
 * Construire l'anneau autour de la note
 */
buildAnneau(){
  this.anneau = DCreate('IMG', {src:`img/anneau-${Current.color}.png`, class:'note-anneau'})
  this.anneau.style.top   = px(this.anneauTop)
  this.anneau.style.left  = px(this.anneauLeft)
  this.portee.add(this.anneau)
  this.anneau.addEventListener('click', this.removeAnneau.bind(this))
}

get anneauTop() { return this.top  - 12}
get anneauLeft(){ return this.left + 64 + (this.isRonde ? 10 : 0)}


/**
 * Détruit complètement la note
 * 
 */
destroy(){
  this.obj.remove()
  this.removeLignesSup()
  this.removeAlteration()
}

/**
 * Pour ajouter si nécessaire des lignes supplémentaires
 * 
 */
graveLignesSup(){
  this.lignesSup && this.removeLignesSup()
  if ( this.top >= this.portee.top && this.top < this.portee.bottom + NOTE_ECART ) return
  // Sinon, il faut construire les lignes supplémentaires
  this.lignesSup = []
  var topls ;
  if ( this.top < this.portee.top ) {
    // Lignes supplémentaires au-dessus
    topls = this.portee.top + 5
    while (topls > this.top + INTERLIGNE ) {
      topls -= INTERLIGNE
      this.createLigneSup(topls)
    }
  } else {
    // 
    // Lignes supplémentaires en dessous
    // 
    topls = this.portee.bottom + 5
    while (topls < this.top - 4 ) {
      topls += INTERLIGNE
      this.createLigneSup(topls)
    }
  }
}

/**
 * Crée la ligne supplémentaire
 */
createLigneSup(top){
  var img = DCreate('IMG', {src:'img/ligne-sup.svg', class:`ligne-sup ${this.type}`})
  img.style.left = px(this.ligneSupLeft)
  img.style.top  = px(top)
  this.lignesSup.push(img)
  this.portee.add(img)
}

/**
 * Détruit les lignes supplémentaires
 */
removeLignesSup(){
  if ( this.lignesSup ) {
    this.lignesSup.forEach(l => l.remove())
    this.lignesSup = null
  }
}


/**
 * Ajoute une altération à la note
 */
graveAlteration(){
  this.objAlteration && this.removeAlteration()
  if ( this.alteration ) {
    var img = DCreate('IMG',{src:`img/alter-${this.alteration}.svg`, class:'alteration'})
    img.style.top   = px(this.alterationTop)
    img.style.left  = px(this.alterationLeft)
    this.objAlteration = img
    this.portee.add(this.objAlteration)
  }
}

/**
 * La hauteur de l'altération
 */
get alterationTop(){
  var t = this.top - 32
  this.alteration.endsWith('bemol') && ( t -= 30 )
  return t 
}

/**
 * La position de l'altération en fonction de ce qu'elle est
 * 
 */
get alterationLeft(){
  switch(this.alteration){
    case 'double-bemol': return this.left
    case 'double-diese': return this.left + 24
    default: return this.left + 32
  }
}

removeAlteration(){
  if ( this.objAlteration ) {
    this.objAlteration.remove()
    this.objAlteration = null    
  }
}

get left(){ return this._left }
set left(l){this._left = l}

get top(){
  return this._top || (this._top = this.rectifiedTop - ((this.octave - 3) * OCTAVE_HEIGHT))
}

/**
 * Retourne la hauteur rectifiée de la note, en fonction du fait que
 * c'est une ronde ou une noire
 */
get rectifiedTop(){
  return this.naturalTop + (this.isRonde ? 3 : 0)
}

/**
 * Retourne la hauteur naturelle de la note
 * 
 */
get naturalTop(){
  if ( this.portee.key == FA ) {
    switch(this.note){
    case 'b' : return TOP_FA - 8 * NOTE_ECART
    case 'a' : return TOP_FA - 7 * NOTE_ECART
    case 'g' : return TOP_FA - 6 * NOTE_ECART
    case 'f' : return TOP_FA - 5 * NOTE_ECART
    case 'e' : return TOP_FA - 4 * NOTE_ECART
    case 'd' : return TOP_FA - 3 * NOTE_ECART
    case 'c' : return TOP_FA - 2 * NOTE_ECART
    } 
  } else {
    switch(this.note){
      case 'b' : return TOP_FA - 3 * NOTE_ECART
      case 'a' : return TOP_FA - 2 * NOTE_ECART
      case 'g' : return TOP_FA - 1 * NOTE_ECART
      case 'f' : return TOP_FA
      case 'e' : return TOP_FA + 1 * NOTE_ECART
      case 'd' : return TOP_FA + 2 * NOTE_ECART
      case 'c' : return TOP_FA + 3 * NOTE_ECART
    }    
  }
}

get type(){
  return Current.imageNote
}

get isRonde(){ return this.type == 'ronde' }

} // Classe Note

