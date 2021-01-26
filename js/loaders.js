import Level from './level.js';
import { createBackgroundLayer, createEntityLayer } from './layers.js';
import { loadBackgroundSprite } from './sprites.js';

export function loadImage(url) {
    return new Promise(res => {
        const image = new Image();
        image.addEventListener('load', () => {
            res(image);
        });
        image.src = url;
    });
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tiles.set(x, y, {
                        name: background.tile,
                    })
                }
            }
        });
    });
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`levels/${name}.json`).then(res => res.json()),

        loadBackgroundSprite(),
    ])


        .then(([levelJson, backgroundSprite]) => {

            const level = new Level();

            createTiles(level, levelJson.backgrounds);

            const backgroundLayer = createBackgroundLayer(level, backgroundSprite)
            level.compositer.layers.push(backgroundLayer);

            const entityLayer = createEntityLayer(level.entities);
            level.compositer.layers.push(entityLayer);

            return level;
        });

}