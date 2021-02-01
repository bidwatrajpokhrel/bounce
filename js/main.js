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
import { ballFactory } from './ACONST.js';

const canvas = document.getElementById('bounce');

/**main function */
async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();
    console.log(entityFactory);
    const loadLevel = await levelLoader(entityFactory);
    const level = await loadLevel('level3');


    const camera = new Camera();


    ballFactory.entityFactory = entityFactory;
    ballFactory.ball = ballFactory.entityFactory.ball();
    ballFactory.ball.position.set(1878, 144);
    // const ball = entityFactory.ball();
    // ball.position.set(108, 144);

    // level.entities.add(ball);
    level.entities.add(ballFactory.ball);
    ballFactory.ball.makebig();

    // const keyboard = setupKeyboard(ball);
    const keyboard = setupKeyboard(ballFactory.ball);
    // keyboard.listenTo(window);
    keyboard.listenTo(window);

    setUpMouse(canvas, ballFactory.ball, camera);

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (ballFactory.ball.position.x > 250) {
            camera.position.x = ballFactory.ball.position.x - 250;
        } else {
            camera.position.x = 0;
        }

        if (ballFactory.ball.position.y > 216) {
            camera.position.y = ballFactory.ball.position.y - 216;
        } else {
            camera.position.y = 0;
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