/**
 * Constants required for flagging etc
 */

import EventEmitter from "./eventEmitter.js";

export const hitground = {
    value: "no",
    velocity: 0
};

export const hitceiling = {
    value: "no",
    velocity: 0
}

export const ballFactory = {
    ball: null,
    entityFactory: null
}

export const isInWater = {
    value: "no"
}

export const startingPosition = {
    ballSize: 'small',
    x: 1878,
    y: 144
}

export const score = {
    lives: 3,
    rings: 10,
    score: 0,
    currentLevel: '',
    nextLevel: ''
}

export const GLOBAL_EVENTS = new EventEmitter();