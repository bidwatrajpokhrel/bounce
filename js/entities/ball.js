import Entity from "./entity.js";
import { loadBallSprite } from "../sprite/sprites.js";
import { Jump } from "../traits/jump.js";
import { Move } from "../traits/move.js";
import { score, startingPosition } from "../CONST.js";

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
    sprite.draw("ball", context, 0, 0);
  }

  function drawBigBall(context) {
    sprite.width = 16;
    sprite.height = 16;
    sprite.defineOther("bigBall", 4, 10);
    sprite.draw("bigBall", context, 0, 0);
  }

  function drawSmallBall(context) {
    sprite.width = 12;
    sprite.height = 12;
    sprite.defineOther("ball", 0, 10);
    sprite.draw("ball", context, 0, 0);
  }

  function drawPoppedBall(context) {
    sprite.width = 12;
    sprite.height = 12;
    sprite.defineOther("popped", 2, 10);
    sprite.draw("popped", context, 0, 0);
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
    ball.center.set(
      ball.position.x + ball.size.x / 2,
      ball.position.y + ball.size.y / 2
    );
    ball.radius = ball.size.x / 2;

    ball.addTrait(new Jump());
    ball.addTrait(new Move());
    ball.draw = drawBall;
    ball.popped = "no";
    ball.big = "no";

    ball.makebig = function () {
      if (ball.big == "no") {
        ball.draw = drawBigBall;
        ball.size.set(48, 48);
        ball.position.x -= 13;
        ball.position.y -= 13;
        ball.radius = ball.size.x / 2;
        ball.big = "yes";
      } else {
        return;
      }
    };

    ball.makesmall = function () {
      ball.draw = drawSmallBall;
      ball.size.set(36, 36);
      ball.radius = ball.size.x / 2;
      ball.big = "no";
    };

    ball.pop = function () {
      ball.draw = drawPoppedBall;
      ball.velocity.x = 0;
      ball.velocity.y = 0;
      ball.size.set(36, 36);
      ball.radius = ball.size.x / 2;
      ball.big = "no";
      if (ball.popped == "no") {
        score.lives--;
      }
      ball.popped = "yes";
      setTimeout(() => {
        ball.position.x = startingPosition.x;
        ball.position.y = startingPosition.y;
        if (startingPosition.ballSize == "small") {
          ball.makesmall();
        } else {
          ball.makebig();
        }
        ball.popped = "no";
      }, 250);
    };
    return ball;
  };
}
