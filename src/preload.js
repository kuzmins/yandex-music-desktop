{
    'use strict';

    const path = require("path");
    const {ipcRenderer} = require('electron');
    window.ipcRenderer = ipcRenderer;

    require(path.join(__dirname, 'playerCtrls.js'));
}
