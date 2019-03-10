'use strict';

(() => {
    const {remote} = require('electron');
    const {globalShortcut, dialog} = remote;
    let currentWindow = remote.getCurrentWindow();
    let currentWebContents = currentWindow.webContents;

    const init = () => {
        let webview = document.querySelector('webview');
        let ret;

        ret = globalShortcut.register('MediaPlayPause', () => {
            webview.executeJavaScript('externalAPI.togglePause();');
            // webview.executeJavaScript('externalAPI.isPlaying()', isPlaying => {
            //     if (isPlaying) {
            //         webview.executeJavaScript('externalAPI.togglePause();');
            //     } else {
            //         webview.executeJavaScript('externalAPI.play();');
            //     }
            // });
        });
        if (!ret) {
            dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaPlayPause. Closing tab.\nPossible second opened tab?');
            currentWindow.close();
            return;
        }

        ret = globalShortcut.register('MediaPreviousTrack', () => {
            webview.executeJavaScript('externalAPI.getProgress();', ({position}) => {
                console.log(position);
                if (position>=5) {
                    webview.executeJavaScript('externalAPI.setPosition(0);');
                } else {
                    webview.executeJavaScript('externalAPI.prev();');
                }
            })
        });
        if (!ret) {
            dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaPreviousTrack. Closing tab. \nPossible second opened tab?');
            currentWindow.close();
            return;
        }

        ret = globalShortcut.register('MediaNextTrack', () => {
            webview.executeJavaScript('externalAPI.next();')
        });
        if (!ret) {
            dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaNextTrack. Closing tab. \nPossible second opened tab?');
            currentWindow.close();
        }
    };

    currentWebContents.on('did-finish-load', init);
})();
