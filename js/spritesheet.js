/**class for drawing spritesheet elements onto the canvas */
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }
    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width * 3;
        buffer.width = this.height * 3;
        buffer.getContext('2d').drawImage(
            this.image,
            x * this.width, y * this.height,
            this.width, this.height,

            0, 0,
            this.width * 3, this.height * 3
        );
        this.tiles.set(name, buffer);
    }

    //may need to refactor;
    defineOther(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width * 3;
        buffer.width = this.height * 3;
        buffer.getContext('2d').drawImage(
            this.image,
            x * 12, y * 12,
            this.width, this.height,

            0, 0,
            this.width * 3, this.height * 3);
        this.tiles.set(name, buffer);
    }

    defineHorz(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width * 3;
        buffer.width = this.height * 3;
        buffer.getContext('2d').drawImage(
            this.image,
            x * 12, y * 12,
            this.width, this.height,

            0, 0,
            this.width * 3, this.height * 3);
        this.tiles.set(name, buffer);
    }

    defineLogo(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width * 3;
        buffer.width = this.height * 3;
        buffer.getContext('2d').drawImage(
            this.image,
            x * 12, y * 12,
            this.width, this.height,

            0, 0,
            this.width * 1.8, this.height * 1.8);
        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width * 3, y * this.height * 3);
    }

    writeText(context, xPos, yPos, color, size, text) {
        context.font = `${size}px VT323`;
        context.fillStyle = color;
        context.fillText(text, xPos, yPos);
    }

    fillStartScreen(context, color) {
        context.fillStyle = color;
        context.fillRect(0, 0, 500, 365);
    }

    fillDash(context, color, text, textSize) {
        context.fillStyle = color;
        context.fillRect(0, 288, 500, 77);
        context.font = `${textSize}px VT323`;
        context.fillStyle = '#ffffff';
        context.fillText(text, 360, 320);
    }



}