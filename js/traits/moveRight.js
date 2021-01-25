import { Trait } from '../entity.js'

export class MoveRight extends Trait {
    constructor() {
        super('moveRight');
        this.speed = 100;
        this.engage = 0;
    };

    start() {
        this.engageTime = 1;
    }

    update(entity, deltaTime) {
        if (this.engageTime == 1) {
            entity.velocity.x = this.speed;
        }
    }

    cancel() {
        this.engageTime = 0;
    }
}