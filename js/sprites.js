import SpriteSheet from './spritesheet.js';
import { loadImage } from './loaders.js';

export function loadBallSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 12, 12);
        sprite.define('ball', 2, 0);
        return sprite;
    });
}

export function loadSpiderSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 24, 24);
        sprite.defineSpider('spider', 2, 7);
        return sprite;
    });
}

// export function loadBackgroundSprite() {
//     return loadImage('images/sprite.png').then(image => {
//         const sprite = new SpriteSheet(image, 12, 12);
//         sprite.define('back', 0, 6);
//         sprite.define('ground', 1, 0);
//         sprite.define('pseudo-ground', 1, 0);
//         sprite.define('blue-ground', 1, 2);
//         sprite.define('r-slant', 2, 6);
//         sprite.define('l-slant', 0, 0);
//         return sprite;
//     });
// }