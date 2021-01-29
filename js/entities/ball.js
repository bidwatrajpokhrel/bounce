import Entity, { Trait } from '../entity.js';
import { loadBallSprite } from '../sprites.js';
import { Speed } from '../traits/speed.js';
import { Jump } from '../traits/jump.js';
import { Move } from '../traits/move.js';

export function loadBall() {
    return loadBallSprite().then(createBallFactory);
    // the above could have been an arrow function that gives sprite as argument -- mentioned because create ball factory takes in sprite as an argument
    // for ex. ... + .then(sprite => createBallFactory(sprite));
}

/**
 * @param {*} sprite - A spriteSheet object that contains specifications for the ball
 */

function createBallFactory(sprite) {

    /**
     * draws the ball as defined in spritesheet
     * @param {*} context 
     */
    function drawBall(context) {
        sprite.draw('ball', context, 0, 0);
    }

    /**
     * Return method for the createball factory. Does just that. Creates ball
     * Create the ball as an object of entity
     * 
     */
    return function createBall() {
        const ball = new Entity();
        ball.name = "ball";
        ball.size.set(36, 36);
        ball.center.set(ball.position.x + (ball.size.x / 2), ball.position.y + (ball.size.y / 2));
        ball.radius = ball.size.x / 2;

        ball.addTrait(new Jump());
        // ball.addTrait(new Speed());
        ball.addTrait(new Move());
        ball.draw = drawBall;



        // ball.update = function updateBall(deltaTime) {
        //     this.position.x += this.velocity.x * deltaTime;
        //     this.position.y += this.velocity.y * deltaTime;
        // }

        return ball;
    }
}