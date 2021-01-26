export class Matrix {
    constructor() {
        this.grid = [];
    }
    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = []
        }
        this.grid[x][y] = value;
    }
    get(x, y) {
        if (this.grid[x]) {
            return this.grid[x][y];
        }
        return;
    }
    forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }
}


export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}