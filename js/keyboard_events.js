
window.onkeypress = function(e) {
  switch(e.key){
    case 'c': case 'd': case 'e': case 'f': case 'g': case 'a': case 'b' :
      Current.portee.buildNote({note: e.key})
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
      Current.note.down(e)
      break
    case 'ArrowUp':
      Current.note.up(e)
      break
    default:
      // console.info("KEY-UP e.key",e.key )
  }
}
