import { Trait } from '../entity.js'

export class Jump extends Trait {
    constructor() {
        super('jump');
        this.duration = 0.2;
        this.speed = 320;
        this.engage = 0;
    };

    start() {
        this.engageTime = this.duration;
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.speed;
            this.engageTime -= deltaTime;
        }
    }

    cancel() {
        this.engageTime = 0;
    }
}