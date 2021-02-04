import InputRouter from "./inputRouter.js";
import Keyboard from "./keyboard.js";

/**
 * Control the entity based on the keyboard inputs
 */
export function setupKeyboard(window) {
  const UP = "KeyW";
  const LEFT = "KeyA";
  const RIGHT = "KeyD";

  const keyboard = new Keyboard();
  const router = new InputRouter();

  keyboard.listenTo(window);

  keyboard.addMapping(UP, (keyState) => {
    if (keyState) {
      router.route((entity) => entity.jump.start());
    } else {
      router.route((entity) => entity.jump.cancel());
    }
  });

  keyboard.addMapping(LEFT, (keyState) => {
    router.route((entity) => (entity.move.direction += keyState ? -150 : 150));
  });

  keyboard.addMapping(RIGHT, (keyState) => {
    router.route((entity) => (entity.move.direction += keyState ? 150 : -150));
  });

  return router;
}
