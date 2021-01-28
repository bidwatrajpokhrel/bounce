export function createBackgroundLayer(level, backgroundSprite) {

    const tiles = level.tiles;
    const resolver = level.tileCollider.tiles;

    const buffer = document.createElement('canvas');
    buffer.width = 396 + 36;
    // buffer.height = 360;
    // buffer.width = 12000;
    buffer.height = 1900;


    const context = buffer.getContext('2d');

    function redraw(XstartIndex, XendIndex) {
        for (let x = XstartIndex; x <= XendIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    backgroundSprite.drawTile(tile.name, context, x - XstartIndex, y);
                });
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFromX = resolver.toIndex(camera.position.x);
        const drawToX = drawFromX + drawWidth;
        redraw(drawFromX, drawToX);

        context.drawImage(buffer, -camera.position.x, -camera.position.y);
    }
}

export function createEntityLayer(entities, width = 64, height = 64) {
    const entityBuffer = document.createElement('canvas');
    entityBuffer.width = width;
    entityBuffer.height = height;
    const entityBufferContext = entityBuffer.getContext('2d');

    return function drawEntityLayer(context, camera) {
        entities.forEach(entity => {
            entityBufferContext.clearRect(0, 0, width, height);
            entity.draw(entityBufferContext);
            context.drawImage(entityBuffer, entity.position.x - camera.position.x, entity.position.y - camera.position.y);
        });
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

    return function drawCollision(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(x * tileSize - camera.position.x, y * tileSize - camera.position.y, tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.position.x - camera.position.x, entity.position.y - camera.position.y, entity.size.x, entity.size.y);
            context.stroke();
        })
        resolvedTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(cameraToDraw.position.x - fromCamera.position.x, cameraToDraw.position.y - fromCamera.position.y, cameraToDraw.size.x, cameraToDraw.size.y);
        context.stroke();
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