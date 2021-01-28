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
