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

  /**
   * Reçoit une note — qui peut être exprimée façon MIDI (A#) — et
   * retourne une table contenant : 
   *    {note:'<note minuscule>', alteration:<alter>}
   * en tenant compte de la tonalité par défaut.
   * Par exemple, si A# est envoyé, et que la tonalité est DO majeur
   * la table retournée sera :
   *    {note:'b', alteration: 'b'}
   * … car en DO majeur, par enharmonie, c'est le SI bémol qui est le
   * plus proche.
   * 
   * 
   * @return {:note, :alteration}
   */
  static dataNoteInTune(note){
    const tune = Pref['tune']
    var dnote = ALTERATIONS_PER_TUNE[tune][note]
    if ( dnote ) {
      if (dnote.alt == 'b') dnote.alt = 'bemol'
      else if (dnote.alt == '#') dnote.alt = 'diese'
    } else {
      var snote = note.split('')
      dnote = {note: snote[0].toLowerCase()}
      if ( snote[1] == '#' ) { Object.assign(dnote, {alt: 'diese'}) }
    }
    return dnote
  }

constructor(data){
  this.data       = data
  this.id         = data.id // = index dans la liste des notes
  this.portee     = data.portee
  this.note       = data.note
  this.octave     = data.octave
  this.alteration = data.alteration || data.alt
  this.left       = data.left
  
  /**
   * WARNING
   * -------
   *    Il ne faut surtout pas ajouter la note dans le DOM ou dans 
   *    une liste d'instances ici, car la classe permet aussi 
   *    d'instancier des notes qui ne seront jamais écrites.
   * 
   */
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
 * Le left de la note
 * Fonction du fait que la note précédente est à moins d'un demi-ton
 */
get noteLeft(){
  return this._noteleft || (this._noteleft = this.calcNoteLeft())
}
// Calcule le left de la note en fonction des notes environnantes
calcNoteLeft(){
  var nl = this.left + NOTE_OFFSET
  // Y a-t-il une note à moins d'un demi-ton, sur le même octave et
  // le même left absolu ?

  // Index 
  const idx   = Number(this.indexNote);
  const note  = this.note

  for (var inote = 0,len = Notes.items.length; inote < len; ++inote){
    let n = Notes.items[inote]
    // console.log("Note comparée : ", n)

    // Si c'est la même note, on passe
    if ( this.id == n.id ) {
      // console.log("C'est la même note, je passe")
      continue
    }

    // Si ce n'est pas le même left, on passe
    if ( this.left != n.left ) {
      // console.log("Pas le même left (%s/%s), je passe", this.left, n.left)
      continue
    }

    let si_et_do = n.note == 'b' && note == 'c'
    var notes_proches = si_et_do || (idx - n.indexNote < 2)

    // Si les notes ne sont pas proches, on les passe
    if ( ! notes_proches ) {
      // console.log("Les notes ne sont pas contigues, je passe")
      continue
    }

    // Si les notes ne sont pas sur le même octave, on les passe
    var bon_octave = n.octave == this.octave || (si_et_do && this.octave == n.octave + 1)
    if ( ! bon_octave ) {
      // console.log("Pas sur le bon octave, je passe")
      continue
    }

    // Sinon, il faut faire la rectif et s'en aller
    // console.log("JE RECTIFIE !", this, n)
    nl += 66
    break

  }
  return nl
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
  listen(this.obj, 'click', this.onClickNote.bind(this))
}

onClickNote(){
  Pref.no_anneau_note_clicked || this.drawAnneau()
  Pref.play_note_clicked && this.play()
}

play(){
  // console.log("Je dois jouer cette note", this)
  var n = this.note.toUpperCase()
  var o = this.octave
  if (this.alteration) {
    switch(this.alteration){
      case 'diese':
        if ( ['B','E'].includes(n)){
          n = {'B':'C','E':'F'}[n]
          n == 'C' && (o += 1)
        } else {
          n += '#'
        }
        break
      case 'bemol':
        n = {'C':'B','D':'C#','E':'D#','F':'E','G':'F#','A':'G#','B':'A#'}[n]
        n == 'B' && (o -= 1)
        break
      case 'double-diese':
        n = {'C':'D','D':'E','E':'F#','F':'G','G':'A','A':'B','B':'C#'}[n]
        break
      case 'double-bemol':
        n = {'C':'A#','D':'C','E':'D','F':'D#','G':'F','A':'G','B':'A'}[n]
        break
    }
  }
  Duplex.send({operation:'PLAY', note:{note:n, octave: o - 2 }})
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
  this.portee.removeNote(this)
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


const ALTERATIONS_PER_TUNE = {
  'C': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'e',alt:'b'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'b',alt:'b'}
  }
, 'Cm': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'C#': {
    'C':{note:'b',alt:'#'}, 'F':{note:'e',alt:'#'}, 'G':{note:'f',alt:'x'}
  }
, 'C#m': {
    'C':{note:'b',alt:'#'}, 'F':{note:'e',alt:'#'}, 'G':{note:'f',alt:'x'}
  }
, 'D': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'Dm': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'e',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'D#': {
    'D':{note:'c',alt:'x'}, 'F':{note:'e',alt:'#'}, 'G':{note:'f',alt:'x'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'D#m': {
    'D':{note:'c',alt:'x'}, 'F':{note:'e',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'Eb': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'g',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'Ebm': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'g',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'E': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'Em': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'F': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'g',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'Fm': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'g',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'F#': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F':{note:'e',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G':{note:'f',alt:'x'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'F#m': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F':{note:'e',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G':{note:'f',alt:'x'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'G': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'Gm': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'f',alt:'#'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'G#': {
    'C':{note:'b',alt:'#'}, 'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F':{note:'e',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G':{note:'f',alt:'x'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'G#m': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F':{note:'e',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G':{note:'f',alt:'x'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'A': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'Am': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'e',alt:'b'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'b',alt:'b'}
  }
, 'Bb': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'g',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'Bbm': {
    'C#':{note:'d',alt:'b'}, 'D#':{note:'e',alt:'b'}, 'F#':{note:'g',alt:'b'}, 'G#':{note:'a',alt:'b'}, 'A#':{note:'b',alt:'b'}
  }
, 'B': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
, 'Bm': {
    'C#':{note:'c',alt:'#'}, 'D#':{note:'d',alt:'#'}, 'F#':{note:'f',alt:'#'}, 'G#':{note:'g',alt:'#'}, 'A#':{note:'a',alt:'#'}
  }
}
