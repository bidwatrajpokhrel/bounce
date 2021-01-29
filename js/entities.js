import { loadBall } from './entities/ball.js';
import { loadSpider } from './entities/spider.js';


export function loadEntities() {
    const entityFactories = {};
    return Promise.all([
        loadBall().then(factory => {
            entityFactories.ball = factory; //replace factory name with something else
        }),
        loadSpider().then(factory => {
            entityFactories.spider = factory;
        })
    ]).then(() => entityFactories);
}