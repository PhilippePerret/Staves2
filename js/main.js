'use strict';

const page = new Page()

document.addEventListener('DOMContentLoaded', function() {
    UI.setWithPreferences()
    UI.observe()
    page.addPortees()
    Current.visualizeNextSnap()
    Interconnexion.init()
}, false);

