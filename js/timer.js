/**
 * Timer class is used in order to ensure smooth gameplay
 * What this class does is that it gives us 60 frames per second no matter what the screen refresh rate
 * For example, even a 30 fps or a 144 fps screen will play in 60 fps
 * This ensures that 30 fps gameplay isn't slow and 144fps gameplay isn't fast
 */
export default class Timer {
    constructor(deltaTime = 1 / 60) {
        let lastTime = 0;
        let accumulatedTime = 0;
        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue();
            // setTimeout(update, 1000 / 500, performance.now());

        }
    }
    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }
    start() {
        this.enqueue();
    }
}