

class InterconnexionClass {
  init(){
    this.intercon = new Interconnexion({name:'Table <-> Staves', other: window.parent })
    this.intercon.receive = this.receive.bind(this)
  }
  send(data){
    this.intercon.send(data) 
  }
  
  receive(data){
    switch(data.operation){
      case 'NOTE':
        // console.log("Note MIDI : ", data.note)
        if ( Current.modeMidiOn ) {
          var note = data.note.name
          var dnote = Note.dataNoteInTune(note)
          var octa = Pref.keep_octave_midi ? data.note.octave + 2 : null
          Object.assign(dnote, {octave: octa})
          Current.portee.buildNote(dnote)
        }
        break
      case 'ACTIVATE':
        // console.log("Je dois activer Staves")
        document.body.focus()
        break
    }
  }
}
const Duplex = new InterconnexionClass()
