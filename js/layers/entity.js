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

