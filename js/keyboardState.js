const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        //holds the current state of a given key
        this.keyStates = new Map();

        //hold the callback for a key keyCode
        this.keyMap = new Map();
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event) {
        const { keyCode } = event;
        if (!this.keyMap.has(keyCode)) {
            //doesn't have the keymap
            return;
        }
        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(keyCode) == keyState) {
            return;
        }

        this.keyStates.set(keyCode, keyState);
        console.log(this.keyStates)

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}