

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
        var note = data.note.name
        if ( note.match(/#/) ) {
          data = Note.dataNoteInTune(note)
          Object.assign(data, {octave: null})
        } else {
          data = {note:note, octave:null, alteration:null}
        }
        Current.portee.buildNote({note:data.note.name.toLowerCase(), alteration:'', octave:null})
        break
      case 'ACTIVATE':
        console.log("Je dois activer Staves")
        break
    }
  }
}
const Duplex = new InterconnexionClass()
