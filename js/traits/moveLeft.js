import { Trait } from '../entity.js'

export class MoveLeft extends Trait {
    constructor() {
        super('moveLeft');
        this.speed = 100;
        this.engage = 0;
    };

    start() {
        this.engageTime = 1;
    }

    update(entity, deltaTime) {
        if (this.engageTime == 1) {
            this.speed = 100;
            entity.velocity.x = -this.speed;
        }
    }

    cancel() {
        this.engageTime = 0;
    }
}