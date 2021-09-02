'use strict';

const page = new Page()

document.addEventListener('DOMContentLoaded', function() {
    UI.setWithPreferences()
    UI.observe()
    Message.init()
    page.addPortees()
    Current.visualizeNextSnap()
    Duplex.init()
}, false);

