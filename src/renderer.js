(() => {
    'use strict';

    const electron = require('electron');

    const {remote} = electron;
    let currentWindow = remote.getCurrentWindow();
    let currentWebContents = currentWindow.webContents;

    currentWebContents.on('did-finish-load', () => {
        const {globalShortcut} = remote;

        globalShortcut.register('MediaPlayPause', () => {
            externalAPI.togglePause();
        });

        globalShortcut.register('MediaPreviousTrack', () => {
            if (externalAPI.getProgress().position >= 5) {
                externalAPI.setPosition(0);
            } else {
                externalAPI.prev();
            }
        });

        globalShortcut.register('MediaNextTrack', () => {
            externalAPI.next();
        });
    });
})();
