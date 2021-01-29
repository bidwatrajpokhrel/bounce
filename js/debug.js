//move mario around 
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