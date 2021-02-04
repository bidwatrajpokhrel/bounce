export default class SceneBuilder {
  constructor() {
    this.sceneIndex = -1;
    this.scenes = [];
  }

  addScene(scene) {
    scene.events.listen("SceneRendered", () => {
      this.runNext();
    });
    this.scenes.push(scene);
  }

  runNext() {
    this.sceneIndex++;
  }

  update(context, deltaTime) {
    const currentScene = this.scenes[this.sceneIndex];
    if (currentScene) {
      currentScene.update(deltaTime);
      currentScene.draw(context);
    }
  }
}
