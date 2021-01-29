import Timer from './timer.js';
import { levelLoader } from './loaders.js';
import { loadBall } from './entities/ball.js';
import { loadSpider } from './entities/spider.js';
// import { createCameraLayer, createCollisionLayer } from './layers.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';
import Camera from './camera.js';
import { setUpMouse } from './debug.js';
import { loadEntities } from './entities.js';

const canvas = document.getElementById('bounce');

/**main function */
async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();
    const loadLevel = await levelLoader(entityFactory);
    const level = await loadLevel('level1');


    const camera = new Camera();


    const ball = entityFactory.ball();
    ball.position.set(108, 144);

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
}

main(canvas);


//collision visualization
// level.compositer.layers.push(createCollisionLayer(level), createCameraLayer(camera));















    // const spider = entityFactory.spider();
    // spider.position.set(735, 144);

    // level.entities.add(spider);

    // const spider1 = entityFactory.spider();
    // spider1.position.set(400, 144);

    // level.entities.add(spider1);