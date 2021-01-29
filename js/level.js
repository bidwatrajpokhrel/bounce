import { hitceiling, hitground } from './ACONST.js';
import Compositer from './compositer.js';
import { loadSpider } from './entities/spider.js';
import { Matrix, Vec2 } from './math.js';
import TileCollider from './tileCollider.js';

/**
 * Level is the specification of the level JSON files. 
 * It adds entities and tiles to it
 * Tiles are added as a matrix
 * Entities are added as a set as opposed to array because a set can only have 1 of each enttity
 */
export default class Level {
    constructor() {
        this.gravity = 600;
        this.compositer = new Compositer();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }

    /**
     * Main function that updates entities in each frame and also controls some behaviour (bounce, rebound entities etc)
     * These specific functions have yet to be refactored into a better place
     * @param {*} deltaTime 
     */
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.position.y += entity.velocity.y * deltaTime;
            entity.center.y = entity.position.y + entity.radius;
            this.tileCollider.checkY(entity);

            //emergency code spider
            if (entity.name === 'spider') {
                if (!entity.velocity.y) {
                    entity.velocity.y = 30;
                }
                if (hitceiling.value == "yes") {
                    entity.velocity.y = 30;
                    hitceiling.value = "no";
                }
                if (hitground.value == "yes") {
                    entity.velocity.y = -30;
                    hitground.value = "no";
                }
            }



            //emergency code

            if (hitground.value == "yes") {
                entity.velocity.y = -hitground.velocity / 2.5;
                hitground.value = "no";
            };
            if (hitceiling.value == "yes") {
                entity.velocity.y = -hitceiling.velocity / 2.5;
                hitceiling.value = "no";
            };



            entity.position.x += entity.velocity.x * deltaTime;
            entity.center.x = entity.position.x + entity.radius;
            this.tileCollider.checkX(entity);


            if (entity.name == 'ball') {
                entity.velocity.y += this.gravity * deltaTime;
            }

        });
    }
}
