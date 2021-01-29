import Entity from '../entity.js';
import { loadSpiderSprite } from '../sprites.js';

export function loadSpider() {
    return loadSpiderSprite().then(createSpiderFactory);
}

function createSpiderFactory(sprite) {
    function drawSpider(context) {
        sprite.draw('spider', context, 0, 0);
    }

    return function createSpider() {
        const spider = new Entity();
        spider.size.set(72, 72);
        spider.name = 'spider';
        spider.draw = drawSpider;

        return spider;
    }
}


/*spider.addTrait({
        NAME: 'up-down',
            obstruct(spider, side) {
            // if (side == 'top') {
            //     // spider.velocity.y = this.speed;
            // } else if (side == 'bottom') {
            //     // spider.velocity.y = -this.speed;
            // }
        },
        update(spider) {
            // spider.velocity.y = this.speed;
        }
        });*/