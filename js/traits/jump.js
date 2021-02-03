import { Trait } from '../entity.js'

/**
 * Jump trait
 * For the ball to jump
 * 
 */
export class Jump extends Trait {
    constructor() {
        super('jump');
        this.ready = false;
        this.duration = 0.2;
        this.speed = 320;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.2; //period when even though the ball hasn't quite hit the ground yet, it still can jump
        this.highJump = false;
    };

    /**begin the ball jump */
    start() {
        if (this.highJump) {
            this.duration += 0.1;
            this.speed *= 1.1;
        }
        else {
            this.duration = 0.2;
            this.speed = 320;
        }
        this.requestTime = this.gracePeriod;
    }

    /**
     * Update the ball once jump is triggered
    */
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

    /**
     * Handle the obstructions for the ball
     * @param {*} entity - the ball (or any other entity that uses this trait)
     * @param {*} side -top or bottom, we get this from the tile collision layer
     * 
     */
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

    /** cancel the jump */
    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
}