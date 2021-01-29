/**
 * Compositer is responsible for compositing different layers of canvas context and render them as a whole
 * Compositer iterates over the layers array which is initially empty
 * 
 */

export default class Compositer {
    constructor() {
        this.layers = [];
    }
    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}
