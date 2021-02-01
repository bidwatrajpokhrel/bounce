import Entity from '../entity.js';
import { loadBigVertRingSprite } from '../sprites.js';

export function loadBigVertRing() {
    return loadBigVertRingSprite().then(createBigVertRingFactory);
}

function createBigVertRingFactory(sprite) {
    function drawBigVertRing(context) {
        sprite.draw('bigVertRing', context, 0, 0);
    }


    function drawDeactivatedRing(context) {
        sprite.defineOther('deactivatedBVR', 3, 12);
        sprite.draw('deactivatedBVR', context, 0, 0);
    }

    return function createBigVertRing() {
        const bigVertRing = new Entity();
        bigVertRing.size.set(18, 72);
        bigVertRing.name = 'bigVertRing';
        bigVertRing.draw = drawBigVertRing;

        bigVertRing.makebig = function () {
            return;
        }

        bigVertRing.deactivate = function () {
            bigVertRing.draw = drawDeactivatedRing;
        }

        return bigVertRing;
    }
}
