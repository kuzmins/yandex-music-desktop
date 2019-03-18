'use strict';

const { app, BrowserWindow } = require('electron');
const path = require("path");

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'Яндекс.Музыка',
        width: 1024,
        height: 768,
        minWidth: 400,
        minHeight: 400,
        center: true,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'renderer.js')
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('close', e => {
        if (process.platform === 'darwin') {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.loadURL('https://music.yandex.ru');
});

app.on('before-quit', () => {
    if (process.platform === 'darwin') {
        app.exit(0);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', (event, hasVisibleWindows) => {
    if (process.platform === 'darwin') {
        if (!hasVisibleWindows) {
            mainWindow.show();
        }
    }
});
