/**
 * Constants required for flagging etc
 */

export const GRAVITY = 600;
export const SPIDER_VELOCITY = 35;
export const UPTHRUST_FACTOR = 2.5;
export const DELTA_TIME = 1 / 60;
export const JUMP_SPEED = 320;
export const JUMP_DURATION = 0.2;
export const MOVE_SPEED = 100;
export const BACKGROUND_MAX_WIDTH = 6000;
export const BACKGROUND_MAX_HEIGHT = 1900;

export const cameraSize = {
  x: 396,
  y: 360,
};
import EventEmitter from "./utils/eventEmitter.js";

export const hitground = {
  value: "no",
  velocity: 0,
};

export const hitceiling = {
  value: "no",
  velocity: 0,
};

export const ballFactory = {
  ball: null,
  entityFactory: null,
};

export const isInWater = {
  value: "no",
};

export const startingPosition = {
  ballSize: "small",
  x: 1878,
  y: 144,
};

export const score = {
  lives: 3,
  rings: 10,
  score: 0,
  currentLevel: "",
  nextLevel: "",
};

export const GLOBAL_EVENTS = new EventEmitter();
