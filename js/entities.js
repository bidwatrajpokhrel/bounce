import Entity, { Trait } from './entity.js';
import { loadBallSprite } from './sprites.js';
import { Speed } from './traits/speed.js';
import { Jump } from './traits/jump.js';
import { MoveLeft } from './traits/moveLeft.js';
import { MoveRight } from './traits/moveRight.js';

export function createBall() {
    return loadBallSprite().then(sprite => {
        const ball = new Entity();

        ball.addTrait(new Speed());
        ball.addTrait(new Jump());
        ball.addTrait(new MoveLeft());
        ball.addTrait(new MoveRight());


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