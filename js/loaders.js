import Level from './level.js';
import { createBackgroundLayer, createEntityLayer } from './layers.js';
// import { loadBackgroundSprite } from './sprites.js';
import SpriteSheet from './spritesheet.js';

export function loadImage(url) {
    return new Promise(res => {
        const image = new Image();
        image.addEventListener('load', () => {
            res(image);
        });
        image.src = url;
    });
}

export function loadJSON(url) {
    return fetch(url).then(res => res.json());
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
    // backgrounds.forEach(background => {
    //     background.ranges.forEach(([xStart, xLength, yStart, yLength]) => {
    //         const xEnd = xStart +xLength;
    //         const yEnd = yStart +yLength;

    //         for (let x = xStart; x < xEnd; ++x) {
    //             for (let y = yStart; y < yEnd; ++y) {
    //                 level.tiles.set(x, y, {
    //                     name: background.tile,
    //                 })
    //             }
    //         }
    //     });
    // });
}

export function loadSpriteSheet(name) {
    return loadJSON(`sprites/${name}.json`).then(sheet =>
        Promise.all([
            sheet,
            loadImage(sheet.imageURL),
        ])).then(([sheet, image]) => {
            const sprite = new SpriteSheet(image, sheet.tileWidth, sheet.tileHeight);


            if (sheet.tiles) {
                sheet.tiles.forEach(tile => {
                    sprite.define(tile.name, tile.index[0], tile.index[1]);
                });
            }
            if (sheet.frames) {
                sheet.frames.forEach(frame => {
                    sprite.define(frame.name, ...frame.rect)
                });
            }
            return sprite;
        });
}

export function loadLevel(name) {
    return Promise.all([
        loadJSON(`levels/${name}.json`),
        loadSpriteSheet('scene'),
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