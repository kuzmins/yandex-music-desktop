'use strict';

const { app, BrowserWindow, globalShortcut, dialog, shell } = require('electron');
const path = require("path");
const baseUrl = "https://music.yandex.ru";
const internalUrlRegex = "(?:music|passport)\.yandex\.ru/.*";
const playerCtrls = ['MediaPlayPause', 'MediaPreviousTrack', 'MediaNextTrack'];

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
            preload: path.join(__dirname, 'preload.js')
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

    mainWindow.webContents.on('did-finish-load', () => {
        playerCtrls.some(ctrl => {
            let ret = globalShortcut.register(ctrl, () => {
                mainWindow.webContents.send('player', ctrl);
            });
            if (!ret) {
                dialog.showErrorBox('Cant bind global shortcut', `Cant bind ${ctrl}. Closing tab. \nPossible second opened tab?`);
                mainWindow.close();
                return true;
            }
        });
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url === 'about:blank' || RegExp(internalUrlRegex).test(url)) {
            return;
        }
        event.preventDefault();
        shell.openExternal(url);
    });

    mainWindow.loadURL(baseUrl);
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

app.on('activate', (e, hasVisibleWindows) => {
    if (process.platform === 'darwin') {
        if (!hasVisibleWindows) {
            mainWindow.show();
        }
    }
});
