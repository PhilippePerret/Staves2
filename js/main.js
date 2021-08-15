'use strict';

const page = new Page()

document.addEventListener('DOMContentLoaded', function() {
    UI.observe()
    page.addPortee()
    Current.visualizeNextSnap()
}, false);

