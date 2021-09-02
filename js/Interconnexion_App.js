

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
        data = Note.dataNoteInTune(note)
        Object.assign(data, {octave:null})
        Current.portee.buildNote(data)
        break
      case 'ACTIVATE':
        console.log("Je dois activer Staves")
        break
    }
  }
}
const Duplex = new InterconnexionClass()
