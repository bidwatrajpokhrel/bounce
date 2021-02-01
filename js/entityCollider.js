import { hitceiling, hitground, startingPosition } from './ACONST.js'

export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }
    check(subject) {
        this.entities.forEach(candidate => {
            if (subject.name === candidate.name) {
                return;
            }

            if (subject.name === 'ball') {
                if (candidate.name === 'spider') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        subject.pop();
                    }
                }
                if (candidate.name === 'checkpoint') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        candidate.checked();
                        startingPosition.x = candidate.position.x;
                        startingPosition.y = candidate.position.y;
                    }
                }
                if (candidate.name === 'lifeBall') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        candidate.checked();
                    }
                }
                if (candidate.name === 'smallVertRing') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        if (subject.big == 'yes') {
                            if (subject.velocity.y > 0) {
                                if (subject.position.y + subject.size.y > candidate.bounds.top) {
                                    subject.position.y = candidate.bounds.top - subject.size.y;
                                    hitground.value = "yes";
                                    hitground.velocity = subject.velocity.y;
                                    subject.velocity.y = 0;
                                    subject.obstruct('bottom');
                                }
                            } else if (subject.velocity.y < 0) {
                                if (subject.position.y < candidate.bounds.bottom) {
                                    subject.position.y = candidate.bounds.bottom;
                                    hitceiling.value = "yes";
                                    hitceiling.velocity = candidate.velocity.y;
                                    subject.velocity.y = 0;
                                    subject.obstruct('top');
                                }
                            }



                            if (subject.velocity.x > 0) {
                                if (subject.position.x + subject.size.x > candidate.right) {
                                    subject.position.x = candidate.right;
                                    subject.velocity.x = 0;
                                }
                            } else if (subject.velocity.x < 0) {
                                if (subject.position.x < candidate.bounds.left) {
                                    subject.position.x = candidate.bounds.left - subject.size.x;
                                    subject.velocity.x = 0;
                                }
                            }
                        } else {
                            candidate.deactivate();
                        }
                    }
                }
                if (candidate.name === 'bigVertRing') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        candidate.deactivate();
                    }
                }
                if (candidate.name === 'smallHorzRing') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        if (subject.big == 'yes') {
                            if (subject.velocity.y > 0) {
                                if (subject.position.y + subject.size.y > candidate.bounds.top) {
                                    subject.position.y = candidate.bounds.top - subject.size.y;
                                    hitground.value = "yes";
                                    hitground.velocity = subject.velocity.y;
                                    subject.velocity.y = 0;
                                    subject.obstruct('bottom');
                                }
                            } else if (subject.velocity.y < 0) {
                                if (subject.position.y < candidate.bounds.bottom) {
                                    subject.position.y = candidate.bounds.bottom;
                                    hitceiling.value = "yes";
                                    hitceiling.velocity = candidate.velocity.y;
                                    subject.velocity.y = 0;
                                    subject.obstruct('top');
                                }
                            }



                            if (subject.velocity.x > 0) {
                                if (subject.position.x + subject.size.x > candidate.right) {
                                    subject.position.x = candidateright;
                                    subject.velocity.x = 0;
                                }
                            } else if (subject.velocity.x < 0) {
                                if (subject.position.x < candidate.bounds.left) {
                                    subject.position.x = candidate.bounds.left - subject.size.x;
                                    subject.velocity.x = 0;
                                }
                            }
                        } else {
                            candidate.deactivate();
                        }
                    }
                }
                if (candidate.name === 'bigHorzRing') {
                    if (subject.bounds.overlaps(candidate.bounds)) {
                        candidate.deactivate();
                    }
                }
            }
        });
    }
}