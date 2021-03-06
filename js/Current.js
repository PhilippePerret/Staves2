'use strict'

const COLORS = ['noir','bleu','vert','rouge','jaune']

/* ----------------------------------------------------------------
    Une classe pour retenir toutes les valeurs courantes :
    - la portée courante, 
    - la note courante,
    - le snap courant,
      etc.
---------------------------------------------------------------- */
class CurrentClass {

  // Note courante (instance Note)
  get note() { return Notes.current }
  set note(n){
    if ( this._note ) this._note.unsetSelected()
    this._note = n
    n.setSelected()
  }

  // Portée courante
  get portee(){return this._portee}
  set portee(p){this._portee = p}
  
  // Snap courant (décalage horizontal)
  get snap(){ 
    this._snap = this.nextSnap
    return this.nextSnap
  }
  get nextSnap(){return this._nextsnap || (this._nextsnap = Pref['snap_width']) }
  set nextSnap(v){
    this._nextsnap = v
    this.visualizeNextSnap()
  }

  resetCursor(){
    this._nextsnap = null
    this.nextSnap = this.nextSnap
  }

  // Couleur courante (pour le cercle autour de la note pour le moment)
  get color(){return this._color }

  // La durée (mode) de la note gravée (soit une noire)
  get imageNote(){return this._note_duree_is_ronde ? 'ronde' : 'noire' }

  get isModePhrase(){return !!this._mode_insert_phrase}

get modePortees(){return this._mode_portees || 0}
get modeMidiOn(){ return this._mode_midi_on == true }

/**
 * Pour définir les valeurs au chargement de l'application
 * 
 */
setPreferences(){
  this._mode_insert_phrase  = Number(Pref['mode_insert_phrase'])
  this.setModeInsert()
  this._note_duree_is_ronde = Number(Pref['note_duree_is_ronde'])
  this.setNoteDuree()
  this._index_color = Number(Pref['index_color'])
  this.setModeColor()
  this._mode_midi_on = true
}

/**
 * Pour passer au "snap" suivant du décalage +left+
 * 
 */
setNextSnap(left){
  this.nextSnap = left + SNAP_WIDTH
}

/**
 * Pour changer le mode d'insertion (par ligne ou par accord)
 * 
 */
changeModeInsert(){
  this._mode_insert_phrase = ! this._mode_insert_phrase
  this.setModeInsert()
}
setModeInsert(){
  UI.btnModeInsert.innerHTML = 'mode ' + (this._mode_insert_phrase ? 'phrase' : 'accord')
}
changeNoteDuree(){
  this._note_duree_is_ronde = !this._note_duree_is_ronde
  this.setNoteDuree()
}
setNoteDuree(){
  UI.btnNoteDuree.innerHTML = this._note_duree_is_ronde ? 'ronde' : 'noire'
}
changeModePortees(){
  this._mode_portees = this._mode_portees || 0
  this._mode_portees = (this._mode_portees + 1) % 3
  this.setModePortees()
}
changeModeSelecti(e, sans_marque){
  if (undefined == sans_marque) {
    this._mode_sans_marques = !this._mode_sans_marques
  } else {
    this._mode_sans_marques = sans_marque
  }
  UI.bntModeSelecti.innerHTML = this._mode_sans_marques ? 'clean' : 'marques'
  this.setModeSansMarques(this._mode_sans_marques)
}
changeModeColor(){
  this._index_color = this._index_color || (Preferences.index_color - 1 /* car on ajoute 1 ci-dessous */)
  this._index_color = (this._index_color + 1) % 5
  return this.setModeColor()
}
setModeColor(){
  this._color = COLORS[this._index_color]
  UI.btnModeColor.innerHTML = this._color
  return this._color
}

changeModeMidi(){
  this._mode_midi_on = !this._mode_midi_on
  UI.btnModeMidi.innerHTML = this._mode_midi_on ? 'MIDI ON' : 'MIDI OFF'
  message(this._mode_midi_on ? "Les notes MIDI s'écrivent" : "Je n'écris plus les notes MIDI", {flash:3})
}

setModePortees(){
  UI.bntModePortees.innerHTML = ['solo','piano','duo'][this.modePortees]
  Page.portee1.setFond()
  Page.portee2.isVisible = this.modePortees != 0
  switch(this.modePortees){
    case 0:
      Page.portee2.unsetFond()
      break
    case 1:
      Page.portee2.setFond().setKeyTo(FA)
      break
    case 2:
      Page.portee2.setFond().setKeyTo(SOL)
      break
  }
}

setModeSansMarques(sans_marque){
  Current.note && Current.note[sans_marque ? 'unsetSelected':'setSelected']()
  this.snapVisualisor.style.visibility = sans_marque ? 'hidden' : 'visible'
}


visualizeNextSnap(){
  if (undefined == this.snapVisualisor) {
    var obj = DCreate('DIV', {id:'snap-visualisator'})
    document.body.appendChild(obj)
    this.snapVisualisor = obj
  }
  this.snapVisualisor.style.top   = px(this.snapVisualisorTop || 72)
  this.snapVisualisor.style.left  = px(this.nextSnap + NOTE_OFFSET + 40)
}

/**
 * Pour adapter la taille (hauteur) du visualiseur de Snap
 */
updateSnapVisualor(top){
  if (this.snapVisualisor) {
    this.snapVisualisorTop = top
    this.snapVisualisor.style.top = px(top)
  }
}

}// class Current

const Current = new CurrentClass()
