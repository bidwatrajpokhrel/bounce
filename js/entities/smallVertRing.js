import Entity from '../entity.js';
import { loadSmallVertRingSprite } from '../sprites.js';

export function loadSmallVertRing() {
    return loadSmallVertRingSprite().then(createSmallVertRingFactory);
}

function createSmallVertRingFactory(sprite) {
    function drawSmallVertRing(context) {
        sprite.draw('smallVertRing', context, 0, 0);
    }

    function drawDeactivatedRing(context) {
        sprite.defineOther('deactivatedSVR', 0, 12);
        sprite.draw('deactivatedSVR', context, 0, 0);
    }

    return function createSmallVertRing() {
        const smallVertRing = new Entity();
        smallVertRing.size.set(18, 72);
        smallVertRing.name = 'smallVertRing';
        smallVertRing.draw = drawSmallVertRing;

        smallVertRing.makebig = function () {
            return;
        }

        smallVertRing.deactivate = function () {
            smallVertRing.draw = drawDeactivatedRing;
        }

        return smallVertRing;
    }
}
