'use strict'
/**
 * Class Snap
 * ----------
 * Pour gérer le snap
 * 
 * Le "snap" définit les endroits où on peut mettre des notes
 */

const SNAP_WIDTH = NOTE_OFFSET + 108

class SnapClass {

/**
 * Pour passer au snap suivant (ou au dernier si la touche Maj est
 * pressée)
 */
next(e){
  Current.nextSnap = Current.snap + SNAP_WIDTH
}
/**
 * Pour revenir au snap précédent (ou au premier si la touche Maj est
 * pressée)
 */
previous(e){
  Current.nextSnap = Current.snap - SNAP_WIDTH
}


}
const Snap = new SnapClass()
