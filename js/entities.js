import { loadBall } from './entities/ball.js';
import { loadSpider } from './entities/spider.js';
import { loadBigBall } from './entities/big-ball.js';
import { loadSmallVertRing } from './entities/smallVertRing.js';
import { loadSmallHorzRing } from './entities/smallHorzRing.js';
import { loadBigVertRing } from './entities/bigVertRing.js';
import { loadBigHorzRing } from './entities/bigHorzRing.js';
import { loadCheckpoint } from './entities/checkpoint.js';
import { loadLifeBall } from './entities/lifeBall.js';

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
        }),
        loadBigBall().then(factory => {
            entityFactories.bigBall = factory;
        }),
        loadSmallVertRing().then(factory => {
            entityFactories.smallVertRing = factory;
        }),
        loadSmallHorzRing().then(factory => {
            entityFactories.smallHorzRing = factory;
        }),
        loadBigVertRing().then(factory => {
            entityFactories.bigVertRing = factory;
        }),
        loadBigHorzRing().then(factory => {
            entityFactories.bigHorzRing = factory;
        }), loadCheckpoint().then(factory => {
            entityFactories.checkpoint = factory;
        }),
        loadLifeBall().then(factory => {
            entityFactories.lifeBall = factory;
        })
    ]).then(() => entityFactories);
}

