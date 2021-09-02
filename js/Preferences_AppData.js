'use strict';

/**
 * Préférences propres à l'application
 * 
 */

const PreferencesAppData = [
    {type:'inputtext',  id:'tune', default:'C', label:"Tonalité courante", description:"Définie par une lettre majuscule (p.e. 'E'), une altération éventuelle ('b' ou '#') et 'm' si c'est une tonalité mineure.<br/>Elle permet de mieux interpréter les notes MIDI."}
  , {type:'checkbox',   id:'same_note_pitch',  label:'Créer toujours la note à distance de quarte de la note sélectionnée', description:'Dans le cas contraire, la note sera toujours créée à la même hauteur de base, en partant du do médian.'}
  , {type:'checkbox',   id:'cursor_follow_edited_note', label: 'Le curseur suit toujours la note éditée', description:"Dans le cas contraire, le contraire restera en place, là où il se trouve."}
  , {type:'checkbox',   id:'change_staff_on_c_median',  label: 'En mode piano, on change de portée au DO médian', description:"C'est_à_dire que dès qu'on arrive sur le DO3, si on descend, on passe sur la portée en clé de FA pour poursuivre et si on monte on passe sur la clé de SOL (note : le DO médian est toujours placé sur la clé de SOL)."}
  , {type:'checkbox',   id:'mode_insert_phrase', label:"Mode d'insertion par défaut", values:["Accord", "Phrase"], description: "Détermine si le curseur reste en position après l'insertion d'une note (mode Accord) ou s'il se déplace au snap suivant (mode Phrase)."}
  , {type:'pressoir',   id:'note_duree_is_ronde', label:"Note par défaut", values:["Ronde", "Noire"], description: "Détermine le style de note qui apparaitra."}
  , {type:'pressoir',   id:'index_color', default: 1, label:"Couleur de l'anneau par défaut", values:COLORS.map(c => {c = c.split('');c[0]=c[0].toUpperCase();return c.join('')}), description: "Définit la couleur par défaut de l'anneau autour d'une note mise en exergue. On peut aussi la modifier avec la touche « k »."}
  , {type:'inputtext',  id:'snap_width', default:200, label:"Snap entre les notes (en pixels)", description:"La distance conseillée est 200 pixels. Penser à tenir compte du fait qu'il peut y avoir des altérations (essayer toujours avec le double_bémol)."}
  , {type:'checkbox',   id:'keep_octave_midi', default: false, label:"Garder l'octave des notes MIDI", description:"Dans le cas contraire, la note sera placée à l'octave normale ou en respectant la <em>proximité de quarte</em> si elle est choisie."}
  , {type:'checkbox',   id:'play_note_clicked', default:true, label:"Jouer la note cliquée"}
  , {type:'checkbox',   id:'no_anneau_note_clicked', default: false, label: "Ne pas entourer la note cliquée."}
]

const Pref = Preferences.data
// Pour transformer des valeurs en booléens
function isTruePref(key) { return Number(Pref[key]) == '1' }
Pref.keep_octave_midi       = isTruePref('keep_octave_midi')
Pref.no_anneau_note_clicked = isTruePref('no_anneau_note_clicked')
Pref.play_note_clicked      = isTruePref('play_note_clicked')


