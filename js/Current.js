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
  get note(){return this._note}
  set note(n){
    if ( this._note ) this._note.unsetSelected()
    this._note = n
    n.setSelected()
  }

  // La durée (mode) de la note gravée (soit une noire)
  get imageNote(){return this._note_duree_is_ronde ? 'ronde' : 'noire' }

  get isModePhrase(){return !!this._mode_insert_phrase}

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



visualizeNextSnap(){
  if (undefined == this.snapVisualisor) {
    var obj = DCreate('DIV', {id:'snap-visualisator'})
    document.body.appendChild(obj)
    this.snapVisualisor = obj
  }
  this.snapVisualisor.style.top   = px(this.portee.top)
  this.snapVisualisor.style.left  = px(this.nextSnap + NOTE_OFFSET + 40)
}


}// class Current

const Current = new CurrentClass()
