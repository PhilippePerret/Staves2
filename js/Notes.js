'use strict'

class NotesClass {

init(){
  this.items    = []
  this.pointer = -1
}

get lastIndex(){
  return this.items.length - 1
}

get current(){
  return this.items[this.pointer]
}

goPrevious(){
  -- this.pointer
  return this.current
}
goNext(){
  ++ this.pointer
  return this.current
}

/**
 * Ajout d'une note (instance Note) dans la liste des notes
 * 
 */
add(note){
  this.items.push(note)
  this.resetPointer()
}

/**
 * Détruit la note (et sélectionne la note d'avant ou la note
 * d'après)
 */
destroyCurrent(note){
  var nextPointer = null ;
  if ( this.pointer < 0 ) return
  if (this.pointer > 0) nextPointer = this.pointer - 1
  else if (this.pointer < this.items.length - 1) nextPointer = 0 + this.pointer
  this.current.destroy()
  this.removeCurrent()
  nextPointer === null || this.setPointer(nextPointer)
}

/**
 * Retirer la note courante
 * 
 */
removeCurrent(){
  this.items.splice(this.pointer,1)
  this.resetPointer()
}

resetPointer(){this.pointer = this.items.length - 1}
setPointer(v){
  // console.info("Pointer mis à ", v)
  this.pointer = v;
  Current.note = this.current
}


}// NotesClass

const Notes = new NotesClass()
Notes.init()
