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

const _factoryCache = {};

export function factorial(n) {
    if (_factoryCache[n] !== void 0) return _factoryCache[n];
    _factoryCache[n] = n < 2 ? 1 : n * factorial(n - 1);
    return _factoryCache[n];
}

export function combination(n, k) {
    return factorial(n) / factorial(k) / factorial(n - k);
}

export function bezier(pos, t) {
    const n = pos.length - 1, t1 = 1 - t;
    let value = 0;
    for (let i = 0; i <= n; i++) {
        // Pi * Combine(n,i) * t^i * (1-t)^(n-i)
        value += pos[i] * combination(n, i) * Math.pow(t, i) * Math.pow(t1, (n - i));
    }
    return value;
}

