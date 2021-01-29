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
    defineSpider(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width * 3;
        buffer.width = this.height * 3;
        buffer.getContext('2d').drawImage(
            this.image,
            x * 12, y * 12,
            28, 28, //for some reason had to put in arbitrary numbers


            0, 0,
            72 + 3, 72 + 3); //arbitrary numbers
        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width * 3, y * this.height * 3);
    }
}