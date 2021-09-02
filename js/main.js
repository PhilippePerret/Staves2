'use strict';


document.addEventListener('DOMContentLoaded', function() {
    UI.setWithPreferences()
    UI.observe()
    Message.init()
    Page.addPortees()
    Current.visualizeNextSnap()
    Duplex.init()
}, false);

