import Entity from '../entity.js';
import { loadSmallHorzRingSprite } from '../sprites.js';

export function loadSmallHorzRing() {
    return loadSmallHorzRingSprite().then(createSmallHorzRingFactory);
}

function createSmallHorzRingFactory(sprite) {
    function drawSmallHorzRing(context) {
        sprite.draw('smallHorzRing', context, 0, 0);
    }

    function drawDeactivatedRing(context) {
        sprite.defineOther('deactivatedSHR', 0, 17);
        sprite.draw('deactivatedSHR', context, 0, 0);
    }

    return function createSmallHorzRing() {
        const smallHorzRing = new Entity();
        smallHorzRing.size.set(72, 18);
        smallHorzRing.name = 'smallHorzRing';
        smallHorzRing.draw = drawSmallHorzRing;

        smallHorzRing.makebig = function () {
            return;
        }

        smallHorzRing.deactivate = function () {
            smallHorzRing.draw = drawDeactivatedRing;
        }
        return smallHorzRing;
    }
}
