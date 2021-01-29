/**
 * creating a matrix grid to store tiles properly
 */
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


export class Line {
    constructor(a, b, c) {
        this.set(a, b, c);
    }
    set(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

//https://www.geeksforgeeks.org/program-find-line-passing-2-points/
//  ax+by+c=0;
export function equationOfLine(x1, x2, y1, y2) {
    const a = y2 - y1;
    const b = x2 - x1;
    const c = - ((a * x1) + (b * y1));
    return (new Line(a, b, c));
}

export function distanceBetweenLineAndPoint(line, point) {
    const distance = (Math.abs((line.a * point.x) + (line.b * point.y) + line.c)) / (Math.sqrt((line.a * line.a) + (line.b * line.b)));
    return distance;
}

