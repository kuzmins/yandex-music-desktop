(() => {
    'use strict';

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
    });
})();
