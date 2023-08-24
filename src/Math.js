export class Vec2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export function v2 (x,y) {
    return new Vec2(x, y);
}