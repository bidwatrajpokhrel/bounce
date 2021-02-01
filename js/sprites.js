import SpriteSheet from './spritesheet.js';
import { loadImage } from './loaders.js';

/**load sprite for the ball */
export function loadBallSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 12, 12);
        sprite.define('ball', 0, 10);
        return sprite;
    });
}

/**
 * load sprite for the spider
 */
export function loadSpiderSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 24, 24);
        sprite.defineOther('spider', 6, 10);
        return sprite;
    });
}

export function loadSmallVertRingSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 6, 24);
        sprite.defineOther('smallVertRing', 1, 12);
        return sprite;
    });
}

export function loadBigVertRingSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 6, 24);
        sprite.defineOther('bigVertRing', 4, 12);
        return sprite;
    });
}

export function loadSmallHorzRingSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 24, 24);
        sprite.defineHorz('smallHorzRing', 0, 20);
        return sprite;
    });
}

export function loadBigHorzRingSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 24, 24);
        sprite.defineHorz('bigHorzRing', 3, 20);
        return sprite;
    });
}

export function loadLifeBallSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 12, 12);
        sprite.define('lifeBall', 0, 6);
        return sprite;
    });
}

export function loadCheckpointSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 12, 12);
        sprite.define('checkpoint', 2, 6);
        return sprite;
    });
}



/**
 * load sprite for the bigBall
 */
export function loadBigBallSprite() {
    return loadImage('images/sprite.png').then(image => {
        const sprite = new SpriteSheet(image, 16, 16);
        sprite.defineOther('bigBall', 2, 9);
        return sprite;
    });
}





/**load the background layers
 * --obsolete-- now loads from scene.json
 */
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