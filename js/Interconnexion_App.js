

class InterconnexionClass {
  init(){
    this interconnexion = new Interconnexion({name:'Table <-> Staves', other: this.panneauStave})
    this.interconnexion.receive = this.receive.bind(this)
  }
  send(data){
    this interconnexion.send(data) 
  }
  receive(data){
    switch(data.operation){
      case 'NOTE':
        console.log("J'ai reçu la note MIDI suivante : ", data.note)
        break
      case 'ACTIVATE':
        console.log("Je dois activer Staves")
        break
    }
  }
}
const Interconnexion = new InterconnexionClass()
