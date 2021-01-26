import TileResolver from './tileResolver.js';
import { hitceiling, hitground } from './ACONST.js'

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        const matches = this.tiles.searchByRange(entity.position.x, entity.position.x + entity.size.x, entity.position.y, entity.position.y + entity.size.y);

        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }

            if (entity.velocity.x > 0) {
                if (entity.position.x + entity.size.x > match.x1) {
                    entity.position.x = match.x1 - entity.size.x;
                    entity.velocity.x = 0;
                }
            } else if (entity.velocity.x < 0) {
                if (entity.position.x < match.x2) {
                    entity.position.x = match.x2;
                    entity.velocity.x = 0;
                }
            }
        });
    }

    checkY(entity) {
        const matches = this.tiles.searchByRange(entity.position.x, entity.position.x + entity.size.x, entity.position.y, entity.position.y + entity.size.y);
        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
            if (entity.velocity.y > 0) {
                if (entity.position.y + entity.size.y > match.y1) {
                    entity.position.y = match.y1 - entity.size.y;
                    hitground.value = "yes";
                    hitground.velocity = entity.velocity.y;
                    entity.velocity.y = 0;
                }
            } else if (entity.velocity.y < 0) {
                if (entity.position.y < match.y2) {
                    entity.position.y = match.y2;
                    hitceiling.value = "yes";
                    hitceiling.velocity = entity.velocity.y;
                    entity.velocity.y = 0;
                }
            }
        });
    }

    test(entity) {
        this.checkY(entity);
    }
}