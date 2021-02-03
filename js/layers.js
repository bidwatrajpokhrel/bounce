



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