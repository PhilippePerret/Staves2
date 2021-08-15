'use strict'
/* ----------------------------------------------------------------
    Une classe pour retenir toutes les valeurs courantes :
    - la portée courante, 
    - le snap courant,
    etc.
---------------------------------------------------------------- */
class Current {

  // Portée courante
  static get portee(){return this._portee}
  static set portee(p){this._portee = p}
  
  // Snap courant (décalage horizontal)
  static get snap(){ return this.nextSnap }
  static get nextSnap(){return this._nextsnap || 200 }
  static set nextSnap(v){this._nextsnap = v}

  // Note courante (instance Note)
  static get note(){return this._note}
  static set note(n){this._note = n}

  // La durée (mode) de la note gravée (soit une noire)
  static get imageNote(){return this._note_duree_is_ronde ? 'ronde' : 'noire' }

  static get isModePhrase(){return !!this._mode_insert_phrase}

/**
 * Pour passer au "snap" suivant du décalage +left+
 * 
 */
static setNextSnap(left){
  this.nextSnap = left + 108
}

/**
 * Pour changer le mode d'insertion (par ligne ou par accord)
 * 
 */
static changeModeInsert(){
  this._mode_insert_phrase = ! this._mode_insert_phrase
  UI.btnModeInsert.innerHTML = 'mode ' + (this._mode_insert_phrase ? 'phrase' : 'accord')
}
static changeNoteDuree(){
  this._note_duree_is_ronde = !this._note_duree_is_ronde
  UI.btnNoteDuree.innerHTML = this._note_duree_is_ronde ? 'ronde' : 'noire'
}

}
