import Compositer from './compositer.js';
import { Matrix } from './math.js';
import TileCollider from './tileCollider.js';


export default class Level {
    constructor() {
        this.gravity = 600;
        this.compositer = new Compositer();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.position.x += entity.velocity.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.position.y += entity.velocity.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.position.x += entity.velocity.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.velocity.y += this.gravity * deltaTime;
        });
    }
}
