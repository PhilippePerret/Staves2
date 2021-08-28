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

  // Couleur courante (pour le cercle autour de la note pour le moment)
  get color(){return this._color || 'bleu'}

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
changeModeSelecti(sans_marque){
  if (undefined == sans_marque) {
    this._mode_sans_marques = !this._mode_sans_marques
  } else {
    this._mode_sans_marques = sans_marque
  }
  UI.bntModeSelecti.innerHTML = this._mode_sans_marques ? 'clean' : 'marques'
  this.setModeSansMarques(this._mode_sans_marques)
}
changeModeColor(){
  this._index_color = this._index_color || 1
  this._index_color = (this._index_color + 1) % 5
  this._color = ['noir','bleu','vert','rouge','jaune'][this._index_color]
  UI.btnModeColor.innerHTML = this._color
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
