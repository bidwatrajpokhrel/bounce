import { cameraSize } from "./CONST.js";
import { Vec2 } from "./utils/math.js";

/**
 * Camera class is responsible for extablishing the viewport for the user.
 * Position is used to define the position of the camera, mostly, we anchor it to the ball (change it with the ball) so that it follows the ball
 */
export default class Camera {
  constructor() {
    this.position = new Vec2(0, 0);
    this.size = new Vec2(cameraSize.x, cameraSize.y);
  }
}
