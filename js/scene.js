import Compositer from './compositer.js';
import EventEmitter from './eventEmitter.js';


export default class Scene {

    constructor() {
        this.events = new EventEmitter();
        this.compositer = new Compositer();

    }

    draw(context) {
        this.compositer.draw(context);
    }

    update(deltaTime) { }

}
