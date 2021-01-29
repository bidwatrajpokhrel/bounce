/**
 * Functions for debugging
 * This function makes it so that we can control the ball with our mouse (drop it or drag it wherever)
 * And also makes it easier for us to move the camera wherever we want through right click drag
 * @param {*} canvas = the main canvas 
 * @param {*} entity = any entity that we want to move (we only use the ball)
 * @param {*} camera = camera element 
 * 
 */
export function setUpMouse(canvas, entity, camera) {
    let lastEvent;
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.velocity.set(0, 0);
                entity.position.set(event.offsetX + camera.position.x, event.offsetY + camera.position.y);
            } else if (event.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type == 'mousemove') {
                camera.position.x -= event.offsetX - lastEvent.offsetX;
                camera.position.y -= event.offsetY - lastEvent.offsetY;
                console.log('here');
            }
            lastEvent = event;
        });
    });

    //prevents the dialog box when rightclick
    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    })
}