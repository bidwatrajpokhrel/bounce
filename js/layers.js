export function createBackgroundLayer(level, backgroundSprite) {
    const buffer = document.createElement('canvas');
    // buffer.width = 396;
    buffer.width = 700;
    buffer.height = 360;


    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        backgroundSprite.drawTile(tile.name, context, x, y);
    })

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0)
    }
}

export function createEntityLayer(entities) {
    return function drawEntityLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        })
    }
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollision(context) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.position.x, entity.position.y, entity.size.x, entity.size.y);
            context.stroke();
        })
        resolvedTiles.length = 0;
    }
}


// function drawBackground(background, context, sprite) {
//     background.ranges.forEach(([x1, x2, y1, y2]) => {
//         for (let x = x1; x < x2; ++x) {
//             for (let y = y1; y < y2; ++y) {
//                 sprite.drawTile(background.tile, context, x, y)
//             }
//         }
//     });
// }


    // backgrounds.forEach(background => {
    //     drawBackground(background, buffer.getContext('2d'), backgroundSprite);
    // });

    // level.tiles.grid.forEach((column, x) => {
    //     column.forEach((tile, y) => {
    //         backgroundSprite.drawTile(tile.name, context, x, y)
    //     })
    // })