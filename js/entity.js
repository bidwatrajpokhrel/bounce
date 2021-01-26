import { Vec2 } from './math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.warn('Unhandeled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.position = new Vec2(0, 0);
        this.velocity = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}

//trait is an instance of a class that can operate on the entity