import Entity from "./entity.js";
import { loadSpiderSprite } from "../sprite/sprites.js";

export function loadSpider() {
  return loadSpiderSprite().then(createSpiderFactory);
}

function createSpiderFactory(sprite) {
  function drawSpider(context) {
    sprite.draw("spider", context, 0, 0);
  }

  return function createSpider() {
    const spider = new Entity();
    spider.size.set(72, 72);
    spider.name = "spider";
    spider.draw = drawSpider;

    spider.makebig = function () {
      return;
    };

    return spider;
  };
}
