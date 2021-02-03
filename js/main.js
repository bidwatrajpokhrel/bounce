import Timer from './timer.js';
import { levelLoader, loadIcon, loadLogo } from './loaders.js';
import { loadBall } from './entities/ball.js';
import { loadSpider } from './entities/spider.js';
// import { createCameraLayer, createCollisionLayer } from './layers.js';
import { createCollisionLayer } from './layers/collision.js';
import { createDashboardLayer } from './layers/dashboard.js';
import { setupKeyboard } from './input.js';
import Camera from './camera.js';
import { setUpMouse } from './debug.js';
import { loadEntities } from './entities.js';
import { ballFactory, GLOBAL_EVENTS, score, startingPosition } from './ACONST.js';
import SceneBuilder from './sceneBuilder.js';
import { createStartScreenLayer } from './layers/startScreen.js';
import CompositionScene from './compositionScene.js';
import EventEmitter from './eventEmitter.js';
import { createGameOverLayer } from './layers/gameOver.js';

export const canvas = document.getElementById('bounce');

/**main function */
export async function main(canvas) {
    const context = canvas.getContext('2d');

    const [entityFactory, icon, logo] = await Promise.all([loadEntities(), loadIcon(), loadLogo()]);
    const loadLevel = await levelLoader(entityFactory);

    const sceneBuilder = new SceneBuilder();

    const ball = entityFactory.ball();

    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(ball);
    // setUpMouse(canvas, ballFactory.ball, camera);

    async function runLevel(name, showStart, showGameOver) {
        const level = await loadLevel(name);
        score.currentLevel = name;
        GLOBAL_EVENTS.listen('LoadLevel', ([levelName, showStart, showGameOver]) => {
            runLevel(levelName, showStart, showGameOver);
        })
        ball.position.set(startingPosition.x, startingPosition.y);
        if (startingPosition.ballSize == 'big') {
            ball.makebig();
            ball.big = 'yes';
        }
        level.entities.add(ball);
        const screens = new CompositionScene();
        if (showStart) {
            screens.compositer.layers.push(createStartScreenLayer(logo));
        }
        if (showGameOver) {
            screens.compositer.layers.push(createGameOverLayer(logo));
        }
        if (screens.compositer.layers.length > 0) {
            sceneBuilder.addScene(screens);
        }

        level.compositer.layers.push(createDashboardLayer(icon));

        sceneBuilder.addScene(level);
        sceneBuilder.runNext();
    }

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {

        sceneBuilder.update(context, deltaTime);

        if (score.lives == 0) {
            GLOBAL_EVENTS.emit('LoadLevel', [score.currentLevel, 0, 1]);
            score.lives = 3;
            score.score = 0;
        }
    }

    timer.start();
    runLevel('level3', 1, 0);
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