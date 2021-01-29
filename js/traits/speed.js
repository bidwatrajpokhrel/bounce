import { Trait } from '../entity.js'

/**
 * Speed trait for the ball
 * Responsible for handling the ball velocities
 */
export class Speed extends Trait {
    constructor() {
        super('speed');
    };

    update(entity, deltaTime) {
        entity.position.x += entity.velocity.x * deltaTime;
        entity.position.y += entity.velocity.y * deltaTime;
    }
}