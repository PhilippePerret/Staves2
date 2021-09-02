'use strict'
/**
 * Class Message
 * --------------
 * Pour l'affichage des messages à l'écran
 * 
 * version 1.3.0
 * 
 
 # 1.3.0
    Ajout du paramètre :flash pour un texte court. Par exemple :
    flash:3 pour un message affiché 3 secondes.
 
 *  
 * 
 * 
 *    message(str)      Une simple note
 *    erreur(str)       Un message d'erreur
 *    action(str)       Une action en cours
 * 
 */


function message(str, params){
  Message.showMessage.call(Message, str, params)
  return true
}
function error(err, params){
  Message.showError.call(Message, err, params)
  return false
}
function erreur(err, params){return error(err, params)}

function action(str, params){
  Message.showAction.call(Message, str, params)
}

class MessageClass {

  init(){
    this.build()
    listen(this.panneauMessage, 'click', this.hideMessage.bind(this))
  }

  showMessage(msg, params){ this.showText(msg, 'notice', params) }
  showError(err, params){   this.showText(err, 'error', params) }
  showAction(msg, params){  this.showText(msg, 'doaction', params) }

  showText(str,type, params){
    this.clearTimerMessage()
    this.divContent.innerHTML = str
    this.panneauMessage.className = type
    this.panneauMessage.classList.remove('hidden')
    if ( type !== 'error'){ 
      var duree = 20*1000
      if ( params && params.flash ) duree = params.flash * 1000
      this.msgTimer = setTimeout(this.hideMessage.bind(this),duree)
    }
  }

  hideMessage(){
    this.panneauMessage.classList.add('vanish')
    this.clearTimerMessage()
  }
  clearTimerMessage(){
    if ( this.msgTimer ){
      clearTimeout(this.msgTimer)
      this.msgTimer = null
    }
  }

  /**
   * Construction de la boite qui contiendra tous les messages
   * 
   */
  build(){
    const closeBox = DCreate('SPAN', {class:'close-btn', text:'⌧'})
    this.divContent  = DCreate('DIV', {class:'message_content'})
    const o = DCreate('DIV', {id:'message', class:'hidden', inner: [this.divContent, closeBox]})
    document.body.appendChild(o)
    this.panneauMessage = o
  }

}
const Message = new MessageClass()
