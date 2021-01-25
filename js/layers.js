function drawBackground(background, context, sprite) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprite.drawTile(background.tile, context, x, y)
            }
        }
    });
}


export function createBackgroundLayer(backgrounds, backgroundSprite) {
    const buffer = document.createElement('canvas');
    // buffer.width = 396;
    buffer.width = 700;
    buffer.height = 360;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), backgroundSprite);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0)
    }
}

export function createEntityLayer(entity) {
    return function drawEntityLayer(context) {
        entity.draw(context);
    }
}
