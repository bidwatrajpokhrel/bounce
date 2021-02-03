import { score } from '../ACONST.js';
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
        smallVertRing.active = 'yes';

        smallVertRing.makebig = function () {
            return;
        }

        smallVertRing.deactivate = function () {
            smallVertRing.draw = drawDeactivatedRing;
            if (smallVertRing.active == 'yes') {
                score.rings--;
                score.score += 500;
            }
            smallVertRing.active = 'no';
        }

        return smallVertRing;
    }
}
