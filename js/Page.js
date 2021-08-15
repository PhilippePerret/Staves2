'use strict'

class Page {

  /**
   * Pour ajouter les portées (2)
   */
  addPortees(){
    this.portee1 = this.addPortee()
    Current.portee = this.portee1
    this.portee2 = this.addPortee()
    Current.setModePortees()
  }
  /**
   * Appelée pour ajouter une page avec les paramètres +params+
   * 
   */
  addPortee(params){
    var p = new Portee(this)
    p.build()
    return p
  }

  get obj(){
    return this._obj || (this._obj = document.querySelector('#page'))
  }
}
