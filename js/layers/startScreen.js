export function createStartScreenLayer(logo) {
    return function drawStartScreen(context) {
        logo.fillStartScreen(context, '#6cfffb');
        logo.draw('bounceLogo', context, 150, 0);
        logo.writeText(context, 190, 200, '#000000', 50, 'Bounce');
        logo.writeText(context, 191, 235, '#000000', 35, 'Controls');
        logo.writeText(context, 135, 265, '#000000', 28, 'W, A, D: Ball Movement');
        logo.writeText(context, 100, 320, 'red', 40, 'PRESS SPACE TO START');
        logo.writeText(context, 115, 350, 'red', 20, 'GO THROUGH ALL RINGS TO OPEN THE GATE');
    }
}