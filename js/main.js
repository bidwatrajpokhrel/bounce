import Timer from './timer.js';
import { loadLevel } from './loaders.js';
import { createBall } from './entities.js';
import { createCameraLayer, createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';
import Camera from './camera.js';
import { setUpMouse } from './debug.js';

const canvas = document.getElementById('bounce');
const context = canvas.getContext('2d');

Promise.all([
    createBall(),
    loadLevel('level1')
]).then(([
    ball, level
]) => {
    const camera = new Camera();

    ball.position.set(108, 144);
    // ball.velocity.set(10, -480);

    // level.compositer.layers.push(credateCollisionLayer(level), createCameraLayer(camera));
    level.entities.add(ball);

    const keyboard = setupKeyboard(ball);
    keyboard.listenTo(window);

    setUpMouse(canvas, ball, camera);

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (ball.position.x > 250) {
            camera.position.x = ball.position.x - 250;
        }
        if (ball.position.y > 216) {
            camera.position.y = ball.position.y - 216;
        }

        level.compositer.draw(context, camera);
    }

    timer.start();
});