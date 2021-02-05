import Compositer from "../compositer.js";
import EventEmitter from "../utils/eventEmitter.js";

/**
 * Scene is an abstract class that facilitates everything that we see on the screen
 */
export default class Scene {
  constructor() {
    this.events = new EventEmitter();
    this.compositer = new Compositer();
  }

  draw(context) {
    this.compositer.draw(context);
  }

  update(deltaTime) {}
}
