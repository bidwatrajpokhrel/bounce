import { GLOBAL_EVENTS } from "./ACONST.js";
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
