import { score } from '../ACONST.js';
import Entity from '../entity.js';
import { loadCheckpointSprite } from '../sprites.js';

export function loadCheckpoint() {
    return loadCheckpointSprite().then(createCheckpointFactory);
}

function createCheckpointFactory(sprite) {
    function drawCheckpoint(context) {
        sprite.draw('checkpoint', context, 0, 0);
    }
    function drawChecked(context) {
        sprite.define('checked', 4, 6);
        sprite.draw('checked', context, 0, 0);
    }

    return function createCheckpoint() {
        const checkpoint = new Entity();
        checkpoint.size.set(72, 72);
        checkpoint.name = 'checkpoint';
        checkpoint.check = 'no';
        checkpoint.draw = drawCheckpoint;

        checkpoint.makebig = function () {
            return;
        }
        checkpoint.checked = function () {
            checkpoint.draw = drawChecked;
            if (checkpoint.check == 'yes') {
                score.score += 500;
                checkpoint.check = 'no';
            }
        }

        return checkpoint;
    }
}