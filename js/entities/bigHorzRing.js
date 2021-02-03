import { score } from '../ACONST.js';
import Entity from '../entity.js';
import { canvas, main } from '../main.js';
import { loadBigHorzRingSprite } from '../sprites.js';

export function loadBigHorzRing() {
    return loadBigHorzRingSprite().then(createBigHorzRingFactory);
}

function createBigHorzRingFactory(sprite) {
    function drawBigHorzRing(context) {
        sprite.draw('bigHorzRing', context, 0, 0);
    }

    function drawDeactivatedRing(context) {
        sprite.defineOther('deactivatedBHR', 3, 17);
        sprite.draw('deactivatedBHR', context, 0, 0);
    }

    return function createBigHorzRing() {
        const bigHorzRing = new Entity();
        bigHorzRing.size.set(72, 18);
        bigHorzRing.name = 'bigHorzRing';
        bigHorzRing.draw = drawBigHorzRing;
        bigHorzRing.active = 'yes';


        bigHorzRing.makebig = function () {
            return;
        }

        bigHorzRing.deactivate = function () {
            bigHorzRing.draw = drawDeactivatedRing;
            if (bigHorzRing.active == 'yes') {
                score.rings--;
                score.score += 500;
            }
            bigHorzRing.active = 'no';
        }


        return bigHorzRing;
    }
}
