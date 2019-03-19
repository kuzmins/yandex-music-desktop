(() => {
    'use strict';

    const currentWebContents = require('electron').remote.getCurrentWindow().webContents;
    const notifier = require('node-notifier');

    currentWebContents.on('did-finish-load', () => {
        ipcRenderer.on('player', (e, ctrl) => {
            switch (ctrl) {
                case 'MediaPlayPause':
                    externalAPI.togglePause();
                    break;
                case 'MediaPreviousTrack':
                    if (externalAPI.getProgress().position >= 5) {
                        externalAPI.setPosition(0);
                    } else {
                        externalAPI.prev();
                    }
                    break;
                case 'MediaNextTrack':
                    externalAPI.next();
                    break;
            }

            let track = externalAPI.getCurrentTrack();
            notifier.notify({
                title: track.title,
                message: track.artists[0].title,
                icon: 'https://' + track.cover.replace("%%", "100x100"),
                sound: false,
                wait: false
            });
        });
    });
})();
