
window.onkeypress = function(e) {
  switch(e.key){
    case 'c': case 'd': case 'e': case 'f': case 'g': case 'a': case 'b' :
      Current.portee.buildNote({note: e.key})
      Current.changeModeSelecti(false) // on fait toujours ré-apparaitre les marques
      break

    case '=': // Plus
      Current.note.diesize()
      break
    case '≠': // Alt Plus
      Current.note.doubleDiesize()
      break

    case '-': // Moins
      Current.note.bemolize()         ;break
    case '—': // Alt Moins
      Current.note.doubleBemolize()   ;break

    case '*':
      Current.note.noAlterize()        ;break
    case '¥':
      Current.note.becarrize()        ;break

    case 'm':
      /**
       * Changement de mode d'entrée phrase/accord
       */
      Current.changeModeInsert.call(Current)
      break


    case 'n':
      /**
       * Changement de durée de note (noire/ronde)
       */
      Current.changeNoteDuree.call(Current)
      break


    case 'p':
      /**
       * Changement du mode de portée (solo/piano/duo)
       */
       Current.changeModePortees.call(Current)
       break

    case 's':
      /**
       * Changement du mode de sélection (marqueurs/clean)
       */
       Current.changeModeSelecti.call(Current)
       break

    default:
      console.info("KEY-PRESS e.key = ", e.key)
  }
}
window.onkeydown = function(e) {
  // console.info("KEY-DOWN e.key",e.key )

}
window.onkeyup = function(e) {
  switch(e.key){
    
    case 'ArrowDown':
      Current.note && Current.note.down(e)
      break
    
    case 'ArrowUp':
      Current.note && Current.note.up(e)
      break

    case 'ArrowLeft':
      if ( e.altKey ) {
        Snap.previous(e)
      } else if ( e.shiftKey ) {
        Current.note && Current.note.moveToPrevSnap(e)
      } else {
        if (Notes.pointer > 0) Current.note = Notes.goPrevious()
        else console.info("C'est la première note.")
      }
      break

    case 'ArrowRight':
      if ( e.altKey ) {
        Snap.next(e)
      } else if ( e.shiftKey ) {
        Current.note && Current.note.moveToNextSnap(e)
      } else {
        if (Notes.pointer < Notes.lastIndex) Current.note = Notes.goNext()
        else console.info("C'est la dernière note.")
      }
      break

    case 'Backspace':
      Notes.destroyCurrent()
      return stopEvent(e)

    case 'Home':
      /**
       * Pour changer de portée active
       */
      page.selectPortee(1)
      return stopEvent(e)
    case 'End':
      /**
       * Pour sélectionner la portée inférieure
       */
      page.selectPortee(2)
      return stopEvent(e)

    default:
      // console.info("KEY-UP e.key",e.key )
  }
}
