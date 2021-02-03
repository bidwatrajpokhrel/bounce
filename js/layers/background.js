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