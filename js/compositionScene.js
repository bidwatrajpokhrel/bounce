import Scene from './scene.js';


export default class CompositionScene extends Scene {
    constructor() {
        super();
        this.pressedSpace = 0;
    }

    draw(context) {
        this.compositer.draw(context);
    }

    update(deltaTime) {
        window.addEventListener('keydown', (e) => {
            if (e.code == 'Space') {
                this.pressedSpace = 1;
            }
        });

        if (this.pressedSpace) {
            this.events.emit('SceneRendered');
            this.pressedSpace = 0;
        }
        this.pressedSpace = 0;
    }
}
