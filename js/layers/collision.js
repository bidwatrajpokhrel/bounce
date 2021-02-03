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
