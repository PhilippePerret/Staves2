'use strict'

class Page {

  /**
   * Appelée pour ajouter une page avec les paramètres +params+
   * 
   */
  addPortee(params){
    var portee = new Portee(this)
    portee.build()
    Current.portee = portee
  }

  get obj(){
    return this._obj || (this._obj = document.querySelector('#page'))
  }
}
