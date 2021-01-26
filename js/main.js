import Timer from './timer.js';
import { loadLevel } from './loaders.js';
import { createBall } from './entities.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('bounce');
const context = canvas.getContext('2d');

Promise.all([
    createBall(),
    loadLevel('level1')
]).then(([
    ball, level
]) => {
    ball.position.set(108, 144);
    // ball.velocity.set(10, -480);

    // level.compositer.layers.push(createCollisionLayer(level));

    level.entities.add(ball);

    const keyboard = setupKeyboard(ball);
    keyboard.listenTo(window);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                ball.velocity.set(0, 0);
                ball.position.set(event.offsetX, event.offsetY);
            }
        });
    });

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.compositer.draw(context);
    }

    timer.start();
});
