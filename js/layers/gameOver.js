export function createGameOverLayer(logo) {
    return function drawGameOverScreen(context) {
        logo.fillStartScreen(context, '#6cfffb');
        logo.draw('bounceLogo', context, 150, 0);
        logo.writeText(context, 160, 200, 'red', 50, 'GAME OVER');
        logo.writeText(context, 191, 235, '#000000', 35, 'Controls');
        logo.writeText(context, 135, 265, '#000000', 28, 'W, A, D: Ball Movement');
        logo.writeText(context, 70, 320, 'red', 40, 'PRESS SPACE TO TRY AGAIN');
    }
}