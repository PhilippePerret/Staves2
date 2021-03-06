'use strict';
/*

  Version 1.2.1
  -------------

# 1.2.1
  Suppression de l'utilisation de Record (pour enregistrer le 
  changement de préférences)

# 1.2.0
  Mise des valeurs par défaut dans les données des préférences de
  l'application, ce qui semble tout de même le plus logique.

# 1.1.0
  Isolation complète du module, avec la méthode de définition des
  valeur par défaut dans le module propre à l'application.
*/

class PreferencesClass {

init(){
  this.data // pour l'instancier
}

toggle(){
  this.isOpened ? this.hide() : this.open()
}
// Pour ouvrir le panneau
open(){
  if ( storageAvailable('localStorage') ){
    this.obj ? this.show() : this.build()
    this.isOpened = true
  } else {
    alert("Malheureusement, on ne peut pas utiliser le stockage local…")
  }
}
hide(){
  this.obj.classList.add('hidden')
  this.isOpened = false
}
show(){
  this.obj.classList.remove('hidden')
}


get data(){return this._data || this.getData()}

// Construction du panneau
build(){
  var o = DCreate('SECTION', {id:'preferences-panel'})
  o.appendChild(DCreate('DIV', {id:'tip-close', text:"(⇧ P pour fermer)"}))
  o.appendChild(DCreate('H2',{text:'Préférences'}))

  // Pour simplifier l'écriture
  const DA = this.data

  if ( 'undefined' == typeof PreferencesAppData) {
    erreur("Il faut définir la constant 'PreferencesAppData' définissant les données de préférences")
  } else {
    this.defaultData = {} // pour mettre les valeurs par défaut
    PreferencesAppData.forEach( dp => {
      Object.assign(this.defaultData, {[dp.id]: dp.default})
      if ( dp.type == 'inputtext'){
        o.appendChild(this.buildInputText(dp))
      } else if ( dp.type == 'checkbox' ) {
        o.appendChild(this.buildCheckBox(dp))
      } else if ( dp.type == 'pressoir' ) {
        o.appendChild(this.buildChoixPressoirs(dp))
      }
    })
  }

  document.body.appendChild(o)

  this.obj = o
  this.observe()
}

observe(){
  listen(this.obj, 'dblclick', e => {return stopEvent(e)})
}

saveData(key, val){
  if ( 'function' == typeof val ) val = val.call()
  this.data[key] = val
  localStorage.setItem(key, val)
}

getData(){
  const s = localStorage
  const nombreData = s.length
  let data = {}
  for(var i = 0; i < nombreData; ++i){
    var key = s.key(i)
    var val = s.getItem(key)
    Object.assign(data, {[key]: val})
  }
  // console.log("Data préférences :", data)
  this._data = this.defaultize(data)
  return this._data
}

/**
 * On met les valeurs pas défaut aux valeurs non définies
 * 
 */
defaultize(data){
  PreferencesAppData.forEach(dp => {
    if (undefined == data[dp.id]) Object.assign(data, {[dp.id]: dp.default})
  })
  return data
}

/**
 * Construction d'un checkbox pour le panneau de préférences
 * 
 */
buildCheckBox(params){
  const d = DCreate('DIV', {class:'div-checkbox div-data'})

  // La case à cocher    
  const cb = DCreate('INPUT',{type:'checkbox', id: params.id, value:params.value})
  d.appendChild(cb)
  // Pour sauver la donnée
  cb.addEventListener('click', this.saveData.bind(this, params.id, function(e){const checked = cb.checked ? '1' : '0'; console.log(params.id + ' enregistré à ' + checked ); return checked}))

  cb.checked = this.data[params.id] == '1'

  // Le label
  const lab = DCreate('LABEL', {for:params.id, text: params.label})
  d.appendChild(lab)

  // La description (if any)
  if (params.description){
    const dd = DCreate('DIV', {class:'description', text:params.description})
    d.appendChild(dd)
  };

  return d

}

/**
 * Construction d'un pressoir à valeurs pour le panneau des préférences
 * 
 */
buildChoixPressoirs(params){
  const my = this
  const div = DCreate('DIV', {id:`div-${params.id}`, class:'type-valeur div-data'})
  const lab = DCreate('LABEL', {text:params.label})
  div.appendChild(lab)
  const val = Number(this.data[params.id]||0) 
  const btn = DCreate('BUTTON', {id:params.id, text: params.values[val]})
  btn.setAttribute('data-index', val)
  div.appendChild(btn)
  btn.addEventListener('click', function(e){
    let curIdx = Number(btn.getAttribute('data-index'))
    curIdx = (curIdx + 1) % params.values.length
    btn.innerHTML = params.values[curIdx]
    btn.setAttribute('data-index', curIdx)
    my.saveData(params.id, curIdx)
  })
  // La description (if any)
  if (params.description){
    div.appendChild(DCreate('DIV', {class:'description', text:params.description}))
  };

  return div
}
/**
 * Construction d'un pressoir à valeurs pour le panneau des préférences
 * 
 * L'identifiant doit toujours être construit avec le nom :
 * 
 *    default-<nom de la propriété Preferences>
 * 
 * Par exemple, si la propriété est 'snap_width' (qu'on obtient dans
 * le programme par 'Preferences.snap_width') alors l'identifiant ici
 * doit être "default-snap_width"
 * 
 */
buildInputText(params){
  const my = this
  const prop = params.id.split('-')[1]
  const div = DCreate('DIV', {id:`div-${params.id}`, class:'type-valeur div-data'})
  const lab = DCreate('LABEL', {text:params.label})
  div.appendChild(lab)
  const field = DCreate('INPUT', {type:'text', id:params.id, value: params.value || this.data[params.id]})
  div.appendChild(field)
  field.addEventListener('change', function(e){my.saveData(params.id, field.value)})
  // La description (if any)
  if (params.description){
    div.appendChild(DCreate('DIV', {class:'description', text:params.description}))
  };

  return div
}

}//PreferencesClass
const Preferences = new PreferencesClass()
// Si on veut utiliser 'Pref[<key>]' on peut ajouter à la fin de
// Preferences_AppData.js :
//    const Pref = Preferences.data
// Note : ne pas le mettre ici, car le fichier Preferences_AppData.js
// n'est pas encore chargé et ça plantera.

/**
 * Méthodes DOM utiles
 * 
 */

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
