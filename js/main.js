import Compositer from './compositer.js';
import Timer from './timer.js';
import { createBackgroundLayer, createEntityLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprite } from './sprites.js';
import { createBall } from './entities.js';
import Keyboard from './keyboardState.js';

const canvas = document.getElementById('bounce');
const context = canvas.getContext('2d');

Promise.all([
    createBall(),
    loadBackgroundSprite(),
    loadLevel('level1')
]).then(([
    ball, backgroundSprite, level
]) => {
    const compositer = new Compositer();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprite)
    compositer.layers.push(backgroundLayer);

    const gravity = 600;

    ball.position.set(108, 252);
    // ball.velocity.set(10, -480);


    const UP = 38;
    const up = new Keyboard();
    up.addMapping(UP, keyState => {
        if (keyState) {
            ball.jump.start();
        } else {
            ball.jump.cancel();
        }
    });
    up.listenTo(window);

    const LEFT = 37;
    const left = new Keyboard();
    up.addMapping(LEFT, keyState => {
        if (keyState) {
            ball.moveLeft.start();
        } else {
            ball.moveLeft.cancel();
        }
    });
    left.listenTo(window);


    const RIGHT = 39;
    const right = new Keyboard();
    up.addMapping(RIGHT, keyState => {
        if (keyState) {
            ball.moveRight.start();
        } else {
            ball.moveRight.cancel();
        }
    });
    right.listenTo(window);

    const entityLayer = createEntityLayer(ball);
    compositer.layers.push(entityLayer);

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
        compositer.draw(context);
        ball.update(deltaTime);
        ball.velocity.y += gravity * deltaTime;
    }

    timer.start();
});
