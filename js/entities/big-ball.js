import Entity, { Trait } from '../entity.js';
import { loadBigBallSprite } from '../sprites.js';
import { Speed } from '../traits/speed.js';
import { Jump } from '../traits/jump.js';
import { Move } from '../traits/move.js';

export function loadBigBall() {
    return loadBigBallSprite().then(createBigBallFactory);
    // the above could have been an arrow function that gives sprite as argument -- mentioned because create ball factory takes in sprite as an argument
    // for ex. ... + .then(sprite => createBallFactory(sprite));
}

/**
 * @param {*} sprite - A spriteSheet object that contains specifications for the ball
 */

function createBigBallFactory(sprite) {

    /**
     * draws the ball as defined in spritesheet
     * @param {*} context 
     */
    function drawBigBall(context) {
        sprite.draw('bigBall', context, 0, 0);
    }

    /**
     * Return method for the createball factory. Does just that. Creates ball
     * Create the ball as an object of entity
     * 
     */
    return function createBigBall() {
        const bigBall = new Entity();
        bigBall.name = "bigBall";
        bigBall.size.set(48, 48);
        bigBall.center.set(bigBall.position.x + (bigBall.size.x / 2), bigBall.position.y + (bigBall.size.y / 2));
        bigBall.radius = bigBall.size.x / 2;

        bigBall.addTrait(new Jump());
        // bigBall.addTrait(new Speed());
        bigBall.addTrait(new Move());
        bigBall.draw = drawBigBall;



        // bigBall.update = function updateBall(deltaTime) {
        //     this.position.x += this.velocity.x * deltaTime;
        //     this.position.y += this.velocity.y * deltaTime;
        // }

        return bigBall;
    }
}