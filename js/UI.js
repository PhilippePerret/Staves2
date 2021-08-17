'use strict'

class UIClass {

  observe(){
    this.observeBoutonsModes()
  }


/**
 * Observation des boutons qui permettent de définir les modes
 * (par exemple les boutons qui disent de basculer du mode accord
 *  au mode mélodie, de la noire à la ronde, etc.)
 */
observeBoutonsModes(){
  this.btnModeInsert  = document.querySelector('button#note-insert-mode')
  this.btnNoteDuree   = document.querySelector('button#note-duree')
  this.bntModePortees = document.querySelector('button#mode-portees')
  this.bntModeSelecti = document.querySelector('button#mode-selection')
  this.btnModeColor   = document.querySelector('button#mode-color')

  this.btnModeInsert.addEventListener('click', Current.changeModeInsert.bind(Current))
  this.btnNoteDuree.addEventListener('click', Current.changeNoteDuree.bind(Current))
  this.bntModePortees.addEventListener('click', Current.changeModePortees.bind(Current))
  this.bntModeSelecti.addEventListener('click', Current.changeModeSelecti.bind(Current))
  this.btnModeColor.addEventListener('click', Current.changeModeColor.bind(Current))
}

}//class UIClass
const UI = new UIClass()
