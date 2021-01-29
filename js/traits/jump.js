import { Trait } from '../entity.js'

export class Jump extends Trait {
    constructor() {
        super('jump');
        this.ready = false;
        this.duration = 0.2;
        this.speed = 320;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.2;
        this.highJump = false;
    };

    start() {
        if (this.highJump) {
            this.duration += 0.1;
            this.speed *= 1.2;
        }
        else {
            this.duration = 0.2;
            this.speed = 320;
        }
        this.requestTime = this.gracePeriod;
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            this.requestTime -= deltaTime;
        }
        if (this.engageTime > 0) {
            entity.velocity.y = -this.speed;
            this.engageTime -= deltaTime;
        }
        this.ready = false;
    }

    obstruct(entity, side) {
        if (side == 'bottom') {
            this.ready = true;
            this.highJump = false;
        }
        else if (side == 'top') {
            this.cancel();
        }
        else if (side == 'blue-bottom') {
            this.ready = true;
            this.highJump = true;
        }
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
}