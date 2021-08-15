'use strict';

const page = new Page()

document.addEventListener('DOMContentLoaded', function() {
    UI.observe()
    page.addPortees()
    Current.visualizeNextSnap()
}, false);

