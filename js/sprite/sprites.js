import SpriteSheet from "./spritesheet.js";
import { loadImage } from "../loaders.js";

/**
 * load sprite for the ball
 */
export function loadBallSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 12, 12);
    sprite.define("ball", 0, 10);
    return sprite;
  });
}

/**
 * load sprite for the spider
 */
export function loadSpiderSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 24, 24);
    sprite.defineOther("spider", 6, 10);
    return sprite;
  });
}

/**
 * Load vertincal small ring sprite
 */
export function loadSmallVertRingSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 6, 24);
    sprite.defineOther("smallVertRing", 1, 12);
    return sprite;
  });
}

export function loadBigVertRingSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 6, 24);
    sprite.defineOther("bigVertRing", 4, 12);
    return sprite;
  });
}

export function loadSmallHorzRingSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 24, 24);
    sprite.defineHorz("smallHorzRing", 0, 20);
    return sprite;
  });
}

export function loadBigHorzRingSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 24, 24);
    sprite.defineHorz("bigHorzRing", 3, 20);
    return sprite;
  });
}

export function loadLifeBallSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 12, 12);
    sprite.define("lifeBall", 0, 6);
    return sprite;
  });
}

export function loadCheckpointSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 12, 12);
    sprite.define("checkpoint", 2, 6);
    return sprite;
  });
}

export function loadGateSprite() {
  return loadImage("images/sprite.png").then((image) => {
    const sprite = new SpriteSheet(image, 24, 24);
    sprite.defineOther("gate", 6, 15);
    return sprite;
  });
}
