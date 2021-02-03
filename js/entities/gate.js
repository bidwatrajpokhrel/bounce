import { GLOBAL_EVENTS, score } from '../ACONST.js';
import Entity from '../entity.js';
import { loadGateSprite } from '../sprites.js';

export function loadGate() {
    return loadGateSprite().then(createGateFactory);
}

function createGateFactory(sprite) {
    function drawGate(context) {
        sprite.draw('gate', context, 0, 0);
    }

    function drawOpened(context) {
        sprite.defineOther('openGate', 6, 20);
        sprite.draw('openGate', context, 0, 0);
    }

    return function createGate() {
        const gate = new Entity();
        gate.size.set(72, 72);
        gate.name = 'gate';
        gate.draw = drawGate;
        gate.entered = 'no';
        gate.opened = 'no';

        gate.open = function () {
            gate.draw = drawOpened;
            gate.opened = 'yes';
        }

        gate.touched = function () {
            if (gate.entered == 'no') {
                GLOBAL_EVENTS.emit('LoadLevel', [score.nextLevel, 0, 0]);
                score.score = 0;
                gate.entered = 'yes';
            }
        }


        return gate;
    }
}