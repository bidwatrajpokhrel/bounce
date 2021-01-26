import Entity, { Trait } from './entity.js';
import { loadBallSprite } from './sprites.js';
import { Speed } from './traits/speed.js';
import { Jump } from './traits/jump.js';
import { Move } from './traits/move.js';
// import { MoveRight } from './traits/moveRight.js';

export function createBall() {
    return loadBallSprite().then(sprite => {
        const ball = new Entity();
        ball.size.set(36, 36);

        ball.addTrait(new Jump());
        // ball.addTrait(new Speed());
        ball.addTrait(new Move());
        // ball.addTrait(new MoveRight());


        ball.draw = function drawBall(context) {
            sprite.draw('ball', context, this.position.x, this.position.y);
        }



        // ball.update = function updateBall(deltaTime) {
        //     this.position.x += this.velocity.x * deltaTime;
        //     this.position.y += this.velocity.y * deltaTime;
        // }

        return ball;
    });


}