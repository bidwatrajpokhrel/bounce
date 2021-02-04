import Level from "./level.js";
import { createEntityLayer } from "./layers/entity.js";
import SpriteSheet from "./sprite/spritesheet.js";
import { createBackgroundLayer } from "./layers/background.js";
import { score, startingPosition } from "./CONST.js";
import { returnJSON } from "./utils/fileReader.js";

/**
 * Loading images asyncronously
 * @param {*} url
 */
export function loadImage(url) {
  return new Promise((res) => {
    const image = new Image();
    image.addEventListener("load", () => {
      res(image);
    });
    image.src = url;
  });
}
/**
 * loading json asyncronously
 * @param {*} url
 */
export function loadJSON(url) {
  return fetch(url).then((res) => res.json());
}

/**
 * create the background tiles by iterating over them
 * @param {*} level
 * @param {*} backgrounds
 */
function createTiles(level, backgrounds) {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.tiles.set(x, y, {
            name: background.tile,
          });
        }
      }
    });
  });
}

/**
 * Load the contents of sprites from "scene.json" that specifies the  location of the tiles
 * @param {*} name
 */
export function loadSpriteSheet(name) {
  return loadJSON(`sprites/${name}.json`)
    .then((sheet) => Promise.all([sheet, loadImage(sheet.imageURL)]))
    .then(([sheet, image]) => {
      const sprite = new SpriteSheet(image, sheet.tileWidth, sheet.tileHeight);

      if (sheet.tiles) {
        sheet.tiles.forEach((tile) => {
          sprite.define(tile.name, tile.index[0], tile.index[1]);
        });
      }
      return sprite;
    });
}

/**
 * Set up each entity from the level object and get entity factory and push it into the composition
 * @param {*} levelJson
 * @param {*} level
 * @param {*} entityFactory
 */
function setUpEntities(levelJson, level, entityFactory) {
  // console.log(levelJson.entities, entityFactory);

  levelJson.entities.forEach((entities) => {
    const name = entities.name;
    const [x, y] = entities.position;
    const createEntity = entityFactory[name];
    const entity = createEntity();
    entity.position.set(x, y);
    level.entities.add(entity);
  });

  const entityLayer = createEntityLayer(level.entities);
  level.compositer.layers.push(entityLayer);
}

/**
 * Load the entire level including creating background tiles, making background layers and entities
 * @param {*} entityFactory
 */
export function levelLoader(entityFactory) {
  return function loadLevel(name, fromFile) {
    console.log(fromFile);
    if (fromFile) {
      return Promise.all([returnJSON(), loadSpriteSheet("scene")]).then(
        ([levelJson, backgroundSprite]) => {
          return innerLevelLoader(levelJson, backgroundSprite, entityFactory);
        }
      );
    } else {
      console.log("here");
      return Promise.all([
        loadJSON(`levels/${name}.json`),
        loadSpriteSheet("scene"),
      ]).then(([levelJson, backgroundSprite]) => {
        return innerLevelLoader(levelJson, backgroundSprite, entityFactory);
      });
    }
  };
}

function innerLevelLoader(levelJson, backgroundSprite, entityFactory) {
  const level = new Level();

  score.rings = levelJson.rings;
  startingPosition.ballSize = levelJson.ballSize;
  startingPosition.x = levelJson.startingPosition.x;
  startingPosition.y = levelJson.startingPosition.y;
  score.nextLevel = levelJson.nextLevel;

  createTiles(level, levelJson.backgrounds);

  const backgroundLayer = createBackgroundLayer(level, backgroundSprite);
  level.compositer.layers.push(backgroundLayer);

  setUpEntities(levelJson, level, entityFactory);

  return level;
}

export function loadLogo() {
  return loadImage("images/sprite-all.png").then((image) => {
    const logoSprite = new SpriteSheet(image, 108, 108);
    logoSprite.defineLogo("bounceLogo", 1, 2.2);
    return logoSprite;
  });
}

export function loadIcon() {
  return loadImage("images/sprite.png").then((image) => {
    const iconSprite = new SpriteSheet(image, 12, 12);
    iconSprite.define("ballIcon", 0, 15);
    iconSprite.define("ringIcon", 2, 15);
    return iconSprite;
  });
}
