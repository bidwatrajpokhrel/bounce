import Entity from '../entity.js';
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

        lifeBall.makebig = function () {
            return;
        }
        lifeBall.checked = function () {
            lifeBall.draw = drawChecked;
        }

        return lifeBall;
    }
}