'use strict'
/* ----------------------------------------------------------------
    Une classe pour retenir toutes les valeurs courantes :
    - la portée courante, 
    - la note courante,
    - le snap courant,
      etc.
---------------------------------------------------------------- */
class CurrentClass {

  // Portée courante
  get portee(){return this._portee}
  set portee(p){this._portee = p}
  
  // Snap courant (décalage horizontal)
  get snap(){ 
    this._snap = this.nextSnap
    return this.nextSnap
  }
  get nextSnap(){return this._nextsnap || 200 }
  set nextSnap(v){
    this._nextsnap = v
    this.visualizeNextSnap()
  }

  // Note courante (instance Note)
  get note() { return Notes.current }
  set note(n){
    if ( this._note ) this._note.unsetSelected()
    this._note = n
    n.setSelected()
  }

  // La durée (mode) de la note gravée (soit une noire)
  get imageNote(){return this._note_duree_is_ronde ? 'ronde' : 'noire' }

  get isModePhrase(){return !!this._mode_insert_phrase}

get modePortees(){return this._mode_portees || 0}

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
  UI.btnModeInsert.innerHTML = 'mode ' + (this._mode_insert_phrase ? 'phrase' : 'accord')
}
changeNoteDuree(){
  this._note_duree_is_ronde = !this._note_duree_is_ronde
  UI.btnNoteDuree.innerHTML = this._note_duree_is_ronde ? 'ronde' : 'noire'
}
changeModePortees(){
  this._mode_portees = this._mode_portees || 0
  this._mode_portees = (this._mode_portees + 1) % 3
  this.setModePortees()
}

setModePortees(){
  UI.bntModePortees.innerHTML = ['solo','piano','duo'][this.modePortees]
  page.portee1.setFond()
  page.portee2.isVisible = this.modePortees != 0
  switch(this.modePortees){
    case 0:
      page.portee2.unsetFond()
      break
    case 1:
      page.portee2.setFond().setKeyTo(FA)
      break
    case 2:
      page.portee2.setFond().setKeyTo(SOL)
      break
  }
}


visualizeNextSnap(){
  if (undefined == this.snapVisualisor) {
    var obj = DCreate('DIV', {id:'snap-visualisator'})
    document.body.appendChild(obj)
    this.snapVisualisor = obj
  }
  this.snapVisualisor.style.top   = px(this.portee.top)
  this.snapVisualisor.style.left  = px(this.nextSnap + NOTE_OFFSET + 40)
}

/**
 * Pour adapter la taille (hauteur) du visualiseur de Snap
 */
updateSnapVisualor(height){
  if (this.snapVisualisor) {
    this.snapVisualisor.style.top = px(height)
  }
}

}// class Current

const Current = new CurrentClass()
