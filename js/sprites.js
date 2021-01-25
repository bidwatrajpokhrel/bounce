import SpriteSheet from './spritesheet.js';
import { loadImage } from './loaders.js';

export function loadBallSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 12, 12);
        sprite.define('ball', 2, 0);
        return sprite;
    });
}

export function loadBackgroundSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 12, 12);
        sprite.define('back', 0, 6);
        sprite.define('ground', 1, 0);
        return sprite;
    });
}