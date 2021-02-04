const PRESSED = 1;
const RELEASED = 0;

/**
 * Handles keypresses 
 * Basically created in order to keep track of pressed and released states of the keys
 */
export default class Keyboard {
    constructor() {
        //holds the current state of a given key
        this.keyStates = new Map();

        //hold the callback for a key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { code } = event;
        if (!this.keyMap.has(code)) {
            //doesn't have the keymap
            return;
        }

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        //if the key is alredy pressed, ignore
        if (this.keyStates.get(code) == keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}