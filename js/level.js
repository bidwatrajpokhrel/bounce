import { hitceiling, hitground, isInWater, score } from "./CONST.js";
import { Matrix } from "./utils/math.js";
import TileCollider from "./collision/tileCollider.js";
import EntityCollider from "./collision/entityCollider.js";
import Camera from "./camera.js";
import Scene from "./scenes/scene.js";

/**
 * Level is the specification of the level JSON files.
 * It adds entities and tiles to it
 * Tiles are added as a matrix
 * Entities are added as a set as opposed to array because a set can only have 1 of each enttity
 */
export default class Level extends Scene {
  constructor() {
    super();
    this.gravity = 600;
    this.entities = new Set();
    this.tiles = new Matrix();
    this.camera = new Camera();
    this.tileCollider = new TileCollider(this.tiles);
    this.entityCollider = new EntityCollider(this.entities);
  }

  updateCamera(entity) {
    if (entity.position.x > 250) {
      this.camera.position.x = entity.position.x - 250;
    } else {
      this.camera.position.x = 0;
    }

    if (entity.position.y > 216) {
      this.camera.position.y = entity.position.y - 216;
    } else {
      this.camera.position.y = 0;
    }
  }

  draw(context) {
    this.compositer.draw(context, this.camera);
  }
  /**
   * Main function that updates entities in each frame and also controls some behaviour (bounce, rebound entities etc)
   * These specific functions have yet to be refactored into a better place
   * @param {*} deltaTime
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);
      entity.position.y += entity.velocity.y * deltaTime;
      entity.center.y = entity.position.y + entity.radius;
      this.tileCollider.checkY(entity);

      //emergency code spider
      if (entity.name === "spider") {
        if (!entity.velocity.y) {
          entity.velocity.y = 30;
        }
        if (hitceiling.value == "yes") {
          entity.velocity.y = 35;
          hitceiling.value = "no";
        }
        if (hitground.value == "yes") {
          entity.velocity.y = -35;
          hitground.value = "no";
        }
      }

      //emergency code

      if (hitground.value == "yes") {
        entity.velocity.y = -hitground.velocity / 2.5;
        hitground.value = "no";
      }
      if (hitceiling.value == "yes") {
        entity.velocity.y = -hitceiling.velocity / 2.5;
        hitceiling.value = "no";
      }

      entity.position.x += entity.velocity.x * deltaTime;
      entity.center.x = entity.position.x + entity.radius;

      this.tileCollider.checkX(entity);

      this.entityCollider.check(entity);

      if (entity.name == "ball" || entity.name == "bigBall") {
        this.updateCamera(entity);
        entity.velocity.y += this.gravity * deltaTime;
        if (isInWater.value == "yes") {
          entity.velocity.y -= this.gravity * deltaTime * 2.5;
          isInWater.value = "no";
        }
      }

      if (!score.rings) {
        if (entity.name == "gate") {
          entity.open();
        }
      }
    });
  }
}
