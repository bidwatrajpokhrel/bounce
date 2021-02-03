import { score } from "../ACONST.js";

export function createDashboardLayer(icon) {
    return function drawDashboard(context) {
        icon.fillDash(context, '#0853aa', score.score.toString().padStart(7, '0'), 48);

        for (let i = 0; i < score.lives; i++) {
            icon.drawTile('ballIcon', context, i, 8);
        }
        for (let i = 0; i < score.rings; i++) {
            icon.drawTile('ringIcon', context, i, 9);
        }

        // icon.write(score.score.toString().padStart(7, '0'));
    }
}