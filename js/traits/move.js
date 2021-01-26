import { Trait } from '../entity.js'

export class Move extends Trait {
    constructor() {
        super('move');
        this.speed = 100;
        this.direction = 0;
    };


    update(entity, deltaTime) {
        entity.velocity.x = this.speed * this.direction * deltaTime;
        if (this.engageTime > 0) {
            entity.velocity.y = -this.speed;
            this.engageTime -= deltaTime;
        }
    }
}