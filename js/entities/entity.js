import BoundingBox from "../traits/boundingBox.js";
import { Vec2 } from "../utils/math.js";

/**
 * Trait is of an object instance of a class that can operate on the entity
 * Trait is used as a template for different entities --- basically an abstract class
 * Example of trait are jumping, moving, swimming, etc. Anything that an entity does is it's trait
 *
 */
export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  /**used to check collisions for the trait */
  obstruct() {}

  /** used to update the trait in every frame */
  update() {}
}

/**
 * Entities are objects that move and have properties.
 * Ball and spider are the only entities in the game, but we could add as many as we wanted to
 * Entities have properties like position, velocity, size, cnter, name and traits array that contains instances of the Trait class we defined above
 */
export default class Entity {
  constructor() {
    this.position = new Vec2(0, 0);
    this.velocity = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.center = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.position, this.size);
    this.name == "";
    this.radius = 0;
    this.traits = [];
    this.big = "no";
  }

  /** adding trait to the entity */
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  /**used for recognizing obstructions for each trait*/
  obstruct(side) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }

  /**update each trait of the entity */
  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
}
