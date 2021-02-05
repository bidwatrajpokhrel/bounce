import Timer from "./timer.js";
import { levelLoader, loadIcon, loadLogo } from "./loaders.js";
import { createDashboardLayer } from "./layers/dashboard.js";
import { setupKeyboard } from "./input/input.js";
import { loadEntities } from "./entities.js";
import { DELTA_TIME, GLOBAL_EVENTS, score, startingPosition } from "./CONST.js";
import SceneBuilder from "./scenes/sceneBuilder.js";
import { createStartScreenLayer } from "./layers/startScreen.js";
import CompositionScene from "./scenes/compositionScene.js";
import { createGameOverLayer } from "./layers/gameOver.js";

export const canvas = document.getElementById("bounce");

/**main function */
export async function main(canvas) {
  const context = canvas.getContext("2d");

  const [entityFactory, icon, logo] = await Promise.all([
    loadEntities(),
    loadIcon(),
    loadLogo(),
  ]);
  const loadLevel = await levelLoader(entityFactory);

  const sceneBuilder = new SceneBuilder();

  const ball = entityFactory.ball();

  const inputRouter = setupKeyboard(window);
  inputRouter.addReceiver(ball);

  async function runLevel(name, showStart, showGameOver, fromfile) {
    const screens = new CompositionScene();
    const level = await loadLevel(name, fromfile);
    score.currentLevel = name || "level3";
    GLOBAL_EVENTS.listen(
      "LoadLevel",
      ([levelName, showStart, showGameOver, fromFile]) => {
        runLevel(levelName, showStart, showGameOver, fromFile);
      }
    );
    ball.position.set(startingPosition.x, startingPosition.y);
    if (startingPosition.ballSize == "big") {
      ball.makebig();
      ball.big = "yes";
    }

    level.entities.add(ball);
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

  const timer = new Timer(DELTA_TIME);

  timer.update = function update(deltaTime) {
    sceneBuilder.update(context, deltaTime);

    if (score.lives == 0) {
      GLOBAL_EVENTS.emit("LoadLevel", [score.currentLevel, 0, 1, 0]);
      score.lives = 3;
      score.score = 0;
    }
  };

  timer.start();

  window.addEventListener("keypress", (event) => {
    if (event.code == "KeyU") {
      document.querySelector(".canvas-cover").style.display = "none";
      runLevel(0, 1, 0, 1);
    } else if (event.code == "Enter") {
      document.querySelector(".canvas-cover").style.display = "none";
      runLevel("level3", 1, 0, 0);
    } else if (event.code == "KeyL") {
      Object.assign(document.createElement("a"), {
        href: "levelMaker.html",
      }).click();
    }
  });
}

main(canvas);
