'use strict';
/*
  Version 1.0.0
*/


class PreferencesClass {

  /**
   * === PRÉFÉRENCES DE L'APPLICATION ===
   * 
   * Note : permet aussi de régler les valeurs par défaut
   * 
   */
get snap_width(){
  return this._snap_width|| (this._snap_width = this.data['default-snap-width'] || 200)
}
get index_color(){return Number(this.data['pref-index_color'] || 1)}

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


get data(){return this._data || (this._data = this.getData())}

// Construction du panneau
build(){
  var o = DCreate('SECTION', {id:'preferences-panel'})
  o.appendChild(DCreate('DIV', {id:'tip-close', text:"(⇧ P pour fermer)"}))
  o.appendChild(DCreate('H2',{text:'Préférences'}))
  // CB pour pitch à proximité de quarte pour nouvelle note
  o.appendChild(this.buildCheckBox({id:'cb-same-note-pitch', label: 'Créer toujours la note à distance de quarte de la note sélectionnée', description:'Dans le cas contraire, la note sera toujours créée à la même hauteur de base, en partant du do médian.'}))
  // CB pour curseur suit note éditée
  o.appendChild(this.buildCheckBox({id:'cb-cursor-follow-edited-note', label: 'Le curseur suit toujours la note éditée', description:"Dans le cas contraire, le contraire restera en place, là où il se trouve."}))
  // CB pour changement de portée à DO
  o.appendChild(this.buildCheckBox({id:'cb-change-staff-on-c-median', label: 'En mode piano, on change de portée au DO médian', description:"C'est-à-dire que dès qu'on arrive sur le DO3, si on descend, on passe sur la portée en clé de FA pour poursuivre et si on monte on passe sur la clé de SOL (note : le DO médian est toujours placé sur la clé de SOL)."}))
  // Préférence de mode
  o.appendChild(this.buildChoixPressoirs({id:'pref-mode_insert_phrase', label:"Mode d'insertion par défaut", values:["Accord", "Phrase"], description: "Détermine si le curseur reste en position après l'insertion d'une note (mode Accord) ou s'il se déplace au snap suivant (mode Phrase)."}))
  // Préférences de note
  o.appendChild(this.buildChoixPressoirs({id:'pref-note_duree_is_ronde', label:"Note par défaut", values:["Ronde", "Noire"], description: "Détermine le style de note qui apparaitra."}))
  // Préférences de couleur par défaut
  o.appendChild(this.buildChoixPressoirs({id:'pref-index_color', label:"Couleur de l'anneau par défaut", values:COLORS.map(c => {c = c.split('');c[0]=c[0].toUpperCase();return c.join('')}), description: "Définit la couleur par défaut de l'anneau autour d'une note mise en exergue. On peut aussi la modifier avec la touche « k »."}))
  document.body.appendChild(o)

  // Préférence de distance de snap
  o.appendChild(this.buildInputText({id:'default-snap_width', label:"Snap entre les notes (en pixels)", value:this.snap_width, description:"La distance conseillée est 200 pixels. Penser à tenir compte du fait qu'il peut y avoir des altérations (essayer toujours avec le double-bémol)."}))
  this.obj = o
}

saveData(key, val){
  if ( 'function' == typeof val ) val = val.call()
  // console.log("Valeur de '%s' enregistrée : '%s'", key, val)
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
  const field = DCreate('INPUT', {type:'text', id:params.id, value: this[prop] /* renverra la valeur par défaut */})
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
