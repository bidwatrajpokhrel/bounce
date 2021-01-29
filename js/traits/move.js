import { Trait } from '../entity.js'

/**
 * Trait to move the ball/entity left or right
 */
export class Move extends Trait {
    constructor() {
        super('move');
        this.speed = 100;
        this.direction = 0;
        this.distance = 0;
    };


    update(entity, deltaTime) {
        entity.velocity.x = this.speed * this.direction * deltaTime;
        if (this.direction) {
            this.distance += entity.velocity.x * deltaTime;
        } else {
            this.distance = 0
        }
    }
}