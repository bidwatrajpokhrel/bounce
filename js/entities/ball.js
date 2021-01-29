import Entity, { Trait } from '../entity.js';
import { loadBallSprite } from '../sprites.js';
import { Speed } from '../traits/speed.js';
import { Jump } from '../traits/jump.js';
import { Move } from '../traits/move.js';

export function loadBall() {
    return loadBallSprite().then(createBallFactory);
    // the above could have been an arrow function that gives sprite as argument

}

function createBallFactory(sprite) {

    function drawBall(context) {
        sprite.draw('ball', context, 0, 0);
    }

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