import Keyboard from './keyboardState.js';

export function setupKeyboard(entity) {

    const UP = 'KeyW';
    const LEFT = 'KeyA';
    const RIGHT = 'KeyD';

    const keyboard = new Keyboard();

    keyboard.addMapping(UP, keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    keyboard.addMapping(LEFT, keyState => {
        entity.move.direction += keyState ? -200 : 200;
    });

    keyboard.addMapping(RIGHT, keyState => {
        entity.move.direction += keyState ? 200 : -200;
    });

    return keyboard
}