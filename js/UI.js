'use strict'

class UIClass {

  defineElements(){
    this.btnModeInsert  = DGet('button#note-insert-mode')
    this.btnNoteDuree   = DGet('button#note-duree')
    this.bntModePortees = DGet('button#mode-portees')
    this.btnModeColor   = DGet('button#mode-color')
    this.bntModeSelecti = DGet('button#mode-selection')
    this.btnModeMidi    = DGet('button#midi-on-off')

  }

  /**
   * Appelée au chargement de la page pour régler les valeurs en
   * fonction des préférences.
   * 
   * Rappel : ce fichier étant un vrai fichier statique, les 
   * préférences sont enregistrées dans le localStorage
   * 
   */
  setWithPreferences(){
    this.btnModeInsert || this.defineElements()
    Current.setPreferences()

  }

  observe(){
    this.observeBoutonsModes()
  }


/**
 * Observation des boutons qui permettent de définir les modes
 * (par exemple les boutons qui disent de basculer du mode accord
 *  au mode mélodie, de la noire à la ronde, etc.)
 */
observeBoutonsModes(){

  listen(this.btnModeInsert, 'click', Current.changeModeInsert.bind(Current))
  listen(this.btnNoteDuree, 'click', Current.changeNoteDuree.bind(Current))
  listen(this.bntModePortees, 'click', Current.changeModePortees.bind(Current))
  listen(this.btnModeColor, 'click', Current.changeModeColor.bind(Current))
  listen(this.bntModeSelecti,'click', Current.changeModeSelecti.bind(Current))
  listen(this.btnModeMidi, 'click', Current.changeModeMidi.bind(Current))
}

}//class UIClass
const UI = new UIClass()
