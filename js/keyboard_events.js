
window.onkeypress = function(e) {
  switch(e.key){

    case 'c': case 'd': case 'e': case 'f': case 'g': case 'a': case 'b' :
      Current.portee.buildNote({note: e.key})
      Current.changeModeSelecti(null, false) // on fait toujours ré-apparaitre les marques
      break

    case 'h':
      Current.note && Current.note[(Current.note.anneau?'remove':'draw')+'Anneau'].call(Current.note)
      break

    case 'i': case '*': 
      Current.note && Current.note.noAlterize()        ;break
    case 'î': case '¥':
      Current.note && Current.note.becarrize()        ;break

    // pour "j" minuscule voir flèche gauche
    case 'Ï':
      Snap.previous(e);break
    case 'J':
      Current.note && Current.note.moveToPrevSnap(e);break

    case 'k':
      /**
       * Changement de couleur
       */
       Current.note && Current.changeModeColor.call(Current)
       break

    // pour "l" minuscule voir flèche droite
    case 'L':
      Current.note && Current.note.moveToNextSnap(e);break
    case '¬':
      Snap.next(e);break
       
    case 'm':
      /**
       * Changement de mode d'entrée phrase/accord
       */
      Current.changeModeInsert.call(Current)
      break

    case 'M':
      Manuel.toggle.call(Manuel);break

    case 'n':
      /**
       * Changement de durée de note (noire/ronde)
       */
      Current.changeNoteDuree.call(Current)
      break

    case 'o': case '-': // Moins et 'u'
      Current.note && Current.note.bemolize()         ;break
    case 'œ': case '—': // Alt Moins||u
      Current.note && Current.note.doubleBemolize()   ;break

    case 'p':
      /**
       * Changement du mode de portée (solo/piano/duo)
       */
       Current.changeModePortees.call(Current)
       break

    case 'P':
      /**
       * Bascule le panneau des PRÉFÉRENCES
       */
       Preferences.toggle()
       break

    case 's':
      /**
       * Changement du mode de sélection (marqueurs/clean)
       * NON On se trompe trop souvent
       */
       //Current.changeModeSelecti.call(Current)
       break

    case 'T':
      /**
       * Lorsque Staves est "incrusté" dans la table d'analyse,
       * ce raccourci permet de repasser à la table d'harmonie
       * 
       */
      window.parent.postMessage({
        'operation': 'activateTableAnalyse',
        'message': 'Je reviens sur la table d’analyse.'
      }, "*");
      break

    case 'u': case '=': // Plus et "o"
      Current.note && Current.note.diesize()
      break;
    case 'º': case '≠': // Alt Plus et "o"
      Current.note && Current.note.doubleDiesize()
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

    case 'ArrowLeft': case 'j':
      if ( e.altKey /* pour "j" cf. plus haut, à "J" */) {
        Snap.previous(e)
      } else if ( e.shiftKey /* pour "j" voir plus haut à "J" */) {
        Current.note && Current.note.moveToPrevSnap(e)
      } else {
        if (Notes.pointer > 0) Current.note = Notes.goPrevious()
        else console.info("C'est la première note.")
      }
      break

    case 'ArrowRight': case 'l':
      if ( e.altKey /* pour "l" voir plus haut, à "L" */) {
        Snap.next(e)
      } else if ( e.shiftKey /* pour "l" voir plus haut, à "L" */ ) {
        Current.note && Current.note.moveToNextSnap(e)
      } else {
        if (Notes.pointer < Notes.lastIndex) Current.note = Notes.goNext()
        else console.info("C'est la dernière note.")
      }
      break

    case 'Backspace':
      if ( e.shiftKey ) {
        Notes.destroyAll()
      } else {
        Notes.destroyCurrent()
      }
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
