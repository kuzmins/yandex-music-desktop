'use strict';

const { app, BrowserWindow } = require('electron');
const path = require("path");
const { setup: setupPushReceiver } = require('electron-push-receiver');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        title: 'Яндекс.Музыка',
        width: 1024,
        height: 768,
        minWidth: 400,
        minHeight: 400,
        center: true,
        show: false,
        autoHideMenuBar: true,
        backgroundColor: '#000',
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.loadURL('https://music.yandex.ru');
    setupPushReceiver(win.webContents);
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
