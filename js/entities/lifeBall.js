import { GLOBAL_EVENTS, score } from '../ACONST.js';
import Entity from '../entity.js';
import EventEmitter from '../eventEmitter.js';
import { loadLifeBallSprite } from '../sprites.js';

export function loadLifeBall() {
    return loadLifeBallSprite().then(createLifeBallFactory);
}

function createLifeBallFactory(sprite) {
    function drawLifeBall(context) {
        sprite.draw('lifeBall', context, 0, 0);
    }
    function drawChecked(context) {
        sprite.defineOther('lifeEaten', 0, 0);
        sprite.draw('lifeEaten', context, 0, 0);
    }

    return function createLifeBall() {
        const lifeBall = new Entity();
        lifeBall.size.set(72, 72);
        lifeBall.name = 'lifeBall';
        lifeBall.draw = drawLifeBall;
        lifeBall.eaten = 'no';

        lifeBall.makebig = function () {
            return;
        }
        lifeBall.checked = function () {
            if (lifeBall.eaten == 'no') {
                score.lives++;
                score.score += 1000;
            }
            lifeBall.eaten = 'yes';
            lifeBall.draw = drawChecked;

        }

        return lifeBall;
    }
}