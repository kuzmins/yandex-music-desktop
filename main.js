'use strict';

const { app, BrowserWindow } = require('electron');
const { setup: setupPushReceiver } = require('electron-push-receiver');

let win;

function createWindow () {
    win = new BrowserWindow({
        title: 'Яндекс.Музыка',
        width: 1024,
        height: 720,
        minWidth: 400,
        minHeight: 400,
        center: true,
        show: false,
        autoHideMenuBar: true,
        backgroundColor: '#000',
        webPreferences: {
            webviewTag: true
        }
    });
    win.loadFile('index.html');
    win.once('ready-to-show', () => {
        win.show();
    });
    setupPushReceiver(win.webContents);
    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
