/**
 * Create background canvas layer with the level object and the background sprite object (from JSON)
 * @param {*} level 
 * @param {*} backgroundSprite 
 */
export function createBackgroundLayer(level, backgroundSprite) {
    const buffer = document.createElement('canvas');
    // buffer.width = 396;
    // buffer.height = 360;
    buffer.width = 7000;
    buffer.height = 1900;


    const context = buffer.getContext('2d');

    //drawing each tile in the level object through bacground sprite object
    level.tiles.forEach((tile, x, y) => {
        backgroundSprite.drawTile(tile.name, context, x, y);
    })

    //using camera to get position instead of 0
    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.position.x, -camera.position.y);
    }
}

/**
 * creating entity layer on canvas 
 * @param {*} entities 
 * @param {*} width -width of buffer canvas optional
 * @param {*} height -height of buffer canvas optional
 */
export function createEntityLayer(entities, width = 100, height = 100) {
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






/**
 * Not required in final code
 * Layer for viewing the collision tiles... used for debugging and visualization
 * @param {*} level 
 */
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




// /**
//  * 
//  * @param {Viewing the camera layer} cameraToDraw 
//  */
// export function createCameraLayer(cameraToDraw) {
//     return function drawCameraRect(context, fromCamera) {
//         context.strokeStyle = 'purple';
//         context.beginPath();
//         context.rect(cameraToDraw.position.x - fromCamera.position.x, cameraToDraw.position.y - fromCamera.position.y, cameraToDraw.size.x, cameraToDraw.size.y);
//         context.stroke();
//     }
// }

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