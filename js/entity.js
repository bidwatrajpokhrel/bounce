import { Vec2 } from './math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {

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
        this.center = new Vec2(0, 0);
        this.radius = 0;
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}

//trait is an instance of a class that can operate on the entity