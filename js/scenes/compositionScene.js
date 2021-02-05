/**
 * Composition scene is a scene that holds all the canvas compositions except the level element
 *For example: gameoverscene, start screen scene etc
 */
import Scene from "./scene.js";

export default class CompositionScene extends Scene {
  constructor() {
    super();
    this.pressedSpace = 0;
    this.pressedO = 0;
  }

  draw(context) {
    this.compositer.draw(context);
  }

  update(deltaTime) {
    window.addEventListener("keydown", (e) => {
      if (e.code == "Space") {
        this.pressedSpace = 1;
      } else if (e.code == "KeyO") {
        this.pressedO = 1;
      }
    });

    if (this.pressedSpace) {
      this.pressedSpace = 0;
      this.events.emit("SceneRendered");
    }
  }
}
