import TileResolver from "./tileResolver.js";
import { hitceiling, hitground, isInWater } from "../CONST.js";
import { distanceBetweenLineAndPoint, equationOfLine } from "../utils/math.js";

/**
 * Class for tile collisions
 * Takes in the tile matrix from the level
 */
export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  /**
   * Check the X axis collision
   * @param {*} entity
   */
  checkX(entity) {
    const matches = this.tiles.searchByRange(
      entity.position.x,
      entity.position.x + entity.size.x,
      entity.position.y,
      entity.position.y + entity.size.y
    );

    matches.forEach((match) => {
      if (match.tile.name === "ground") {
        if (entity.velocity.x > 0) {
          if (entity.position.x + entity.size.x > match.x1) {
            entity.position.x = match.x1 - entity.size.x;
            entity.velocity.x = 0;
          }
        } else if (entity.velocity.x < 0) {
          if (entity.position.x < match.x2) {
            entity.position.x = match.x2;
            entity.velocity.x = 0;
          }
        }
      } else if (match.tile.name === "l-slant") {
        let distance =
          entity.radius -
          distanceBetweenLineAndPoint(
            equationOfLine(match.x1, match.x2, match.y2, match.y1),
            entity.center
          );
        if (!(distance < 0.02 && distance > -0.02)) {
          if (entity.velocity.x > 0) {
            entity.velocity.y =
              1.25 * -entity.velocity.x * Math.cos((45 * Math.PI) / 180);
          } else if (entity.velocity.x <= 0) {
            entity.position.x -= 3.7 * Math.sin((45 * Math.PI) / 180);
            entity.position.y -= 0.1;
          }
        }
      } else if (match.tile.name === "flip-l-slant") {
        let distance =
          entity.radius -
          distanceBetweenLineAndPoint(
            equationOfLine(match.x1, match.x2, match.y1, match.y2),
            entity.center
          );
        if (!(distance < 0.01 && distance > -0.01)) {
          if (entity.velocity.x > 0) {
            entity.velocity.y =
              1.25 * +entity.velocity.x * Math.cos((45 * Math.PI) / 180);
          } else if (entity.velocity.x <= 0) {
            entity.position.x -= 3.7 * Math.sin((45 * Math.PI) / 180);
            entity.position.y += 0.1;
          }
        }
      } else if (match.tile.name === "flip-r-slant") {
        let distance =
          entity.radius -
          distanceBetweenLineAndPoint(
            equationOfLine(match.x1, match.x2, match.y2, match.y1),
            entity.center
          );
        if (!(distance > 0.01 && distance < -0.01)) {
          if (entity.velocity.x < 0) {
            entity.velocity.y =
              1.25 * -entity.velocity.x * Math.cos((45 * Math.PI) / 180);
          } else if (entity.velocity.x >= 0) {
            entity.position.x += 3.7 * Math.sin((45 * Math.PI) / 180);
            entity.position.y -= 0.1;
          }
        }
      } else if (match.tile.name === "r-slant") {
        let distance =
          entity.radius -
          distanceBetweenLineAndPoint(
            equationOfLine(match.x1, match.x2, match.y2, match.y1),
            entity.center
          );
        if (!(distance > 0.02 && distance < -0.02)) {
          if (entity.velocity.x < 0) {
            entity.velocity.y =
              1.25 * entity.velocity.x * Math.cos((45 * Math.PI) / 180);
          } else if (entity.velocity.x >= 0) {
            entity.position.x += 3.7 * Math.sin((45 * Math.PI) / 180);
            entity.position.y += 0.1;
          }
        }
      } else if (match.tile.name === "water-l-slant") {
        let distance =
          entity.radius -
          distanceBetweenLineAndPoint(
            equationOfLine(match.x1, match.x2, match.y2, match.y1),
            entity.center
          );
        if (!(distance < 0.02 && distance > -0.02)) {
          if (entity.velocity.x > 0) {
            entity.velocity.y =
              1.25 * -entity.velocity.x * Math.cos((45 * Math.PI) / 180);
          } else if (entity.velocity.x <= 0) {
            entity.position.x -= 3.7 * Math.sin((45 * Math.PI) / 180);
            entity.position.y -= 0.1;
          }
        }
      } else if (match.tile.name === "water-r-slant") {
        let distance =
          entity.radius -
          distanceBetweenLineAndPoint(
            equationOfLine(match.x1, match.x2, match.y2, match.y1),
            entity.center
          );
        if (!(distance > 0.02 && distance < -0.02)) {
          if (entity.velocity.x < 0) {
            entity.velocity.y =
              1.25 * entity.velocity.x * Math.cos((45 * Math.PI) / 180);
          } else if (entity.velocity.x >= 0) {
            entity.position.x += 3.7 * Math.sin((45 * Math.PI) / 180);
            entity.position.y += 0.1;
          }
        }
      } else if (match.tile.name === "blue-ground") {
        if (entity.velocity.x > 0) {
          if (entity.position.x + entity.size.x > match.x1) {
            entity.position.x = match.x1 - entity.size.x;
            entity.velocity.x = 0;
          }
        } else if (entity.velocity.x < 0) {
          if (entity.position.x < match.x2) {
            entity.position.x = match.x2;
            entity.velocity.x = 0;
          }
        }
      } else if (match.tile.name === "big-ball-maker") {
        entity.makebig();
        if (entity.velocity.x > 0) {
          if (entity.position.x + entity.size.x > match.x1) {
            entity.position.x = match.x1 - entity.size.x;
            entity.velocity.x = 0;
          }
        } else if (entity.velocity.x < 0) {
          if (entity.position.x < match.x2) {
            entity.position.x = match.x2;
            entity.velocity.x = 0;
          }
        }
      } else if (
        match.tile.name === "small-ball-maker" ||
        match.tile.name === "small-ball-maker-inverse"
      ) {
        entity.makesmall();
        if (entity.velocity.x > 0) {
          if (entity.position.x + entity.size.x > match.x1) {
            entity.position.x = match.x1 - entity.size.x;
            entity.velocity.x = 0;
          }
        } else if (entity.velocity.x < 0) {
          if (entity.position.x < match.x2) {
            entity.position.x = match.x2;
            entity.velocity.x = 0;
          }
        }
      } else if (
        match.tile.name === "spike" ||
        match.tile.name === "spike-inverse"
      ) {
        entity.pop();
        if (entity.velocity.x > 0) {
          if (entity.position.x + entity.size.x > match.x1) {
            entity.position.x = match.x1 - entity.size.x;
            entity.velocity.x = 0;
          }
        } else if (entity.velocity.x < 0) {
          if (entity.position.x < match.x2) {
            entity.position.x = match.x2;
            entity.velocity.x = 0;
          }
        }
      } else if (match.tile.name === "water") {
        //TODO
      } else {
        return;
      }
    });
  }

  /**Check the Y axis collision */
  checkY(entity) {
    const matches = this.tiles.searchByRange(
      entity.position.x,
      entity.position.x + entity.size.x,
      entity.position.y,
      entity.position.y + entity.size.y
    );
    matches.forEach((match) => {
      if (match.tile.name === "ground") {
        if (entity.velocity.y > 0) {
          if (entity.position.y + entity.size.y > match.y1) {
            entity.position.y = match.y1 - entity.size.y;
            hitground.value = "yes";
            hitground.velocity = entity.velocity.y;
            entity.velocity.y = 0;
            entity.obstruct("bottom");
          }
        } else if (entity.velocity.y < 0) {
          if (entity.position.y < match.y2) {
            entity.position.y = match.y2;
            hitceiling.value = "yes";
            hitceiling.velocity = entity.velocity.y;
            entity.velocity.y = 0;
            entity.obstruct("top");
          }
        }
      } else if (match.tile.name === "l-slant") {
        // console.log('l-slant');
        entity.obstruct("bottom");
      } else if (match.tile.name === "r-slant") {
        // console.log('r-slant');
        entity.obstruct("bottom");
      } else if (match.tile.name === "water-l-slant") {
        entity.obstruct("bottom");
      } else if (match.tile.name === "water-r-slant") {
        entity.obstruct("bottom");
      } else if (match.tile.name === "blue-ground") {
        if (entity.velocity.y > 0) {
          if (entity.position.y + entity.size.y > match.y1) {
            entity.position.y = match.y1 - entity.size.y;
            hitground.value = "yes";
            hitground.velocity = entity.velocity.y;
            entity.velocity.y = 0;
            entity.obstruct("blue-bottom");
          }
        } else if (entity.velocity.y < 0) {
          if (entity.position.y < match.y2) {
            entity.position.y = match.y2;
            hitceiling.value = "yes";
            hitceiling.velocity = entity.velocity.y;
            entity.velocity.y = 0;
          }
        }
      } else if (match.tile.name === "big-ball-maker") {
        entity.makebig();
        if (entity.velocity.y > 0) {
          if (entity.position.y + entity.size.y > match.y1) {
            entity.position.y = match.y1 - entity.size.y;
            hitground.value = "yes";
            hitground.velocity = entity.velocity.y;
            entity.velocity.y = 0;
            entity.obstruct("bottom");
          }
        } else if (entity.velocity.y < 0) {
          if (entity.position.y < match.y2) {
            entity.position.y = match.y2;
            hitceiling.value = "yes";
            hitceiling.velocity = entity.velocity.y;
            entity.velocity.y = 0;
          }
        }
      } else if (
        match.tile.name === "small-ball-maker" ||
        match.tile.name === "small-ball-maker-inverse"
      ) {
        entity.makesmall();
        if (entity.velocity.y > 0) {
          if (entity.position.y + entity.size.y > match.y1) {
            entity.position.y = match.y1 - entity.size.y;
            hitground.value = "yes";
            hitground.velocity = entity.velocity.y;
            entity.velocity.y = 0;
            entity.obstruct("bottom");
          }
        } else if (entity.velocity.y < 0) {
          if (entity.position.y < match.y2) {
            entity.position.y = match.y2;
            hitceiling.value = "yes";
            hitceiling.velocity = entity.velocity.y;
            entity.velocity.y = 0;
          }
        }
      } else if (
        match.tile.name === "spike" ||
        match.tile.name === "spike-inverse"
      ) {
        entity.pop();
        if (entity.velocity.y > 0) {
          if (entity.position.y + entity.size.y > match.y1) {
            entity.position.y = match.y1 - entity.size.y;
            hitground.value = "yes";
            hitground.velocity = entity.velocity.y;
            entity.velocity.y = 0;
            entity.obstruct("bottom");
          }
        } else if (entity.velocity.y < 0) {
          if (entity.position.y < match.y2) {
            entity.position.y = match.y2;
            hitceiling.value = "yes";
            hitceiling.velocity = entity.velocity.y;
            entity.velocity.y = 0;
          }
        }
      } else if (match.tile.name === "water") {
        if (entity.big == "yes") {
          if (entity.velocity.y > 0) {
            if (entity.position.y > match.y1 - 25) {
              isInWater.value = "yes";
            }
          } else if (entity.velocity.y < 0) {
            if (entity.position.y < match.y2) {
              entity.velocity.y -= 3;
            }
          }
        }
      } else {
        return;
      }
    });
  }

  test(entity) {
    this.checkY(entity);
  }
}
