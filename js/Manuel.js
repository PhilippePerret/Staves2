'use strict'
/**
 * Manuel
 * ------
 * version 0.1.0
 * 
 * Pour afficher le manuel de l'application.
 * 
 */


class ManuelClass {
  toggle(){
    this[this.isOpened ? 'close' : 'open']()
    this.isOpened = !this.isOpened
  }  
  open(){
    this.obj || this.build()
    this.obj.classList.remove('hidden')
  }
  close(){
    this.obj.classList.add('hidden')
  }

  build(){
    const o = DCreate('SECTION', {id:"manuel", class:'hidden'})
    o.appendChild(DCreate('DIV', {id:'tip-close', style:"float:right;", text:"(⇧M pour fermer)"}))
    o.appendChild(DCreate('H2', {text:"Manuel d'utilisation"}))
    if ('undefined' == typeof ManuelData ) {
      alert("Il faut définir les données du manuel dans une constante ManuelData")
    } else {
      // On peut construire le manuel
      var ioperation = 0
      ManuelData.forEach(md => {
        const op = new ManuelItem(Object.assign(md, {index: ++ioperation}))
        op.build()
        o.appendChild(op.obj)
      })
    }
    document.body.appendChild(o)
    this.obj = o
  }
}
const Manuel = new ManuelClass()


class ManuelItem {
  constructor(data){
    this.index     = data.index
    this.operation = data.operation
    this.procedure = data.procedure
    this.precision = data.precision
    this.note      = data.note
  }

  build(){
    const o = DCreate('DIV', {id:`operation-${this.index}`, class:'operation-manuel'})
    const tit = DCreate('DIV',{class:'operation-titre', text: this.operation})
    listen(tit, 'click', this.toggleProcedure.bind(this))
    o.appendChild(tit)
    const proc = DCreate('DIV', {class:'operation-procedure hidden', text: this.codeProcedure()})
    if ( this.precision ){
      proc.appendChild(DCreate('DIV', {class:'operation-precision', text:this.precision}))
    }
    o.appendChild(proc)
    this.divProc = proc
    this.obj = o
  }

  codeProcedure(){
    var c = this.procedure.map(p => `<li>${p}</li>`).join('')
    return '<ul>' + c + '</ul>'
  }

  toggleProcedure(e){
    this.divProc.classList[ this.isOpened ? 'add' : 'remove']('hidden')
    this.isOpened = !this.isOpened
    return stopEvent(e)
  }

}
