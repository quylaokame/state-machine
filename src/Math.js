export class Vec2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export function v2 (x,y) {
    return new Vec2(x, y);
}

export function randRange(min, max) {
    return min + (Math.random() * (max - min + 1));
}

export function randRangeInt(min, max) {
    return min + ~~(Math.random() * (max - min + 1));
}