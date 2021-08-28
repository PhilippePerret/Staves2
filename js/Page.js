'use strict'

class Page {

  /**
   * Pour ajouter les portées (2)
   */
  addPortees(){
    this.portee1 = this.addPortee()
    this.portee1.setKeyTo(SOL)
    Current.portee = this.portee1
    this.portee2 = this.addPortee()
    this.portee2.setTop(380)
    page.portee2.isVisible = false
    Current.setModePortees()
  }
  /**
   * Appelée pour ajouter une portée avec les paramètres +params+
   * 
   */
  addPortee(params){
    var p = new Portee(this)
    p.build()
    return p
  }

/**
 * Pour sélectionner une autre portée, si c'est possible
 */
selectPortee(num){
  if ( num == 2 && this.portee2.isVisible ) {
    Current.updateSnapVisualor(444)
    Current.portee = this.portee2
  } else {
    Current.updateSnapVisualor(72)
    Current.portee = this.portee1
  }
}

get obj(){
  return this._obj || (this._obj = document.querySelector('#page'))
}

}
