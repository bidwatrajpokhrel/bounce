import { Trait } from '../entity.js'

export class Speed extends Trait {
    constructor() {
        super('speed');
    };

    update(entity, deltaTime) {

        entity.position.x += entity.velocity.x * deltaTime;
        entity.position.y += entity.velocity.y * deltaTime;
    }
}