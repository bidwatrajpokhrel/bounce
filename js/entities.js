import { loadBall } from './entities/ball.js';
import { loadSpider } from './entities/spider.js';

/**
 * loadEntities class provides a loader to create all the available entities
 * it returns an "entity factory" object that contains functions specifying how to load different entities
 * 
 */
export function loadEntities() {
    const entityFactories = {};
    return Promise.all([
        loadBall().then(factory => {
            entityFactories.ball = factory;
        }),
        loadSpider().then(factory => {
            entityFactories.spider = factory;
        })
    ]).then(() => entityFactories);
}