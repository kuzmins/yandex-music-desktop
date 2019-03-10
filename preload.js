'use strict';

const electron = require('electron');
const {ipcRenderer} = electron;
window.ipcRenderer = ipcRenderer;

(() => {
    const {remote} = electron;
    const {globalShortcut, dialog} = remote;
    let currentWindow = remote.getCurrentWindow();
    let currentWebContents = currentWindow.webContents;

    const init = () => {
        let ret;

        ret = globalShortcut.register('MediaPlayPause', () => {
            externalAPI.togglePause();
        });
        if (!ret) {
            dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaPlayPause. Closing tab.\nPossible second opened tab?');
            currentWindow.close();
            return;
        }

        ret = globalShortcut.register('MediaPreviousTrack', () => {
            if (externalAPI.getProgress().position >= 5) {
                externalAPI.setPosition(0);
            } else {
                externalAPI.prev();
            }
        });
        if (!ret) {
            dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaPreviousTrack. Closing tab. \nPossible second opened tab?');
            currentWindow.close();
            return;
        }

        ret = globalShortcut.register('MediaNextTrack', () => {
            externalAPI.next();
        });
        if (!ret) {
            dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaNextTrack. Closing tab. \nPossible second opened tab?');
            currentWindow.close();
        }
    };

    currentWebContents.on('did-finish-load', init);
})();
