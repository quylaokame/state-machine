import gsap from "gsap";
import { bezier } from "../utils";

export class Tween {
    static _tweenMap = {};

    getTimeline() {
        return this._timeline;
    }

    constructor(target) {
        this.target = null;

        this._timeline = null;
        this._relatedTimelines = {};
        this._id = "";
        this._isUnion = false;
        this._onDone = null;
        this._actions = [];
        this._currentTime = 0;

        if (!target) throw new Error("invalid target");
        this.target = target;
        this._id = (Math.random() * Math.random()).toString().slice(10);
        Tween._tweenMap[this._id] = this;
        this._timeline = gsap.timeline({
            paused: true,
            repeatRefresh: true,
            onComplete: () => {
                delete Tween._tweenMap[this._id];
                this._onDone && this._onDone();
            }
        });
    }

    to(duration, props, options = {}) {
        const label = Math.random().toString().slice(10);
        this._timeline.addLabel(label);
        const ease = this._getEase(options);
        this._tweenToNestedProps(duration, props, ease, label);
        Object.assign(props, options);
        ease && (props.ease = ease);
        props.duration = duration;
        props.repeatRefresh = true;
        if (options.onUpdate) {
            props.onUpdate = () => {
                let dt = this._timeline.time() - this._currentTime;
                this._currentTime = this._timeline.time();
                options.onUpdate(dt);
            }
            this._timeline.call(() => {
                this._currentTime = this._timeline.time();
            })
        }
        this._timeline.to(this.target, props, label);
        return this;
    }

    _tweenToNestedProps(duration, props, ease, label) {
        for (let key in props) {
            let value = props[key];
            if (value === undefined || value === null) {
                console.error("invalid property", key, value);
                delete props[key];
                continue;
            }
            if (typeof value === "object") {
                let target;
                let nestedProps;
                if (key === "position" || key === "scale") {
                    target = this.target[key];
                    let { x, y } = value;
                    nestedProps = { x, y };
                } else if (key === "color") {
                    target = this.target[key];
                    const { r, g, b, a } = value;
                    nestedProps = { r, g, b, a };
                }
                ease && (nestedProps.ease = ease);
                nestedProps.duration = duration;
                nestedProps.repeatRefresh = duration;
                this._timeline.to(target, nestedProps, label);
                delete props[key];
            }
        }
    }

    by(duration, props, options = {}) {
        const label = Math.random().toString().slice(10);
        this._timeline.addLabel(label);
        const ease = this._getEase(options);
        this._tweenByNestedProps(duration, props, ease, label);
        Object.assign(props, options);
        ease && (props.ease = ease);
        props.duration = duration;
        props.repeatRefresh = true;
        if (options.onUpdate) {
            props.onUpdate = () => {
                let dt = this._timeline.time() - this._currentTime;
                this._currentTime = this._timeline.time();
                options.onUpdate(dt);
            }
            this._timeline.call(() => {
                this._currentTime = this._timeline.time();
            })
        }
        this._timeline.to(this.target, props, label);
        return this;
    }

    _tweenByNestedProps(duration, props, ease, label){
        for (let key in props) {
            let value = props[key];
            if (value === undefined || value === null) {
                console.error("invalid property", key, value);
                delete props[key];
                continue;
            }
            if (typeof value === "object") {
                let target;
                let nestedProps;
                if (key === "position" || key === "scale") {
                    target = this.target[key];
                    let { x: dx, y: dy } = value;
                    nestedProps = { x: "+=" + dx, y: "+=" + dy };
                } else if (key === "color") {
                    target = this.target[key];
                    const { r: dr, g: dg, b: db, a: da } = value;
                    nestedProps = { r: "+=" + dr, g: "+=" + dg, b: "+=" + db, a: "+=" + da };
                }
                ease && (nestedProps.ease = ease);
                nestedProps.duration = duration;
                nestedProps.repeatRefresh = duration;
                this._timeline.to(target, nestedProps, label);
                delete props[key];
            }
        }
    }

    bezierTo(duration, bezierList, options = {}) {
        const _target = { t: 0 };
        const props = { t: 1, duration, repeatRefresh: true };
        Object.assign(props, options);
        props.ease = this._getEase(options);
        props.onUpdate = () => {
            const { t } = _target;
            this.target.x = bezier(bezierX, t);
            this.target.y = bezier(bezierY, t);
        }
        this._timeline.call(() => {
            _target.t = 0;
            const { x, y } = this.target.position;
            bezierX = [x, ...bezierList.map(p => p.x)];
            bezierY = [y, ...bezierList.map(p => p.y)];
        });
        this._timeline.to(_target, props);
        return this;
    }

    bezierBy(duration, bezierList, options = {}){
        const _target = { t: 0 };
        const props = { t: 1, duration, repeatRefresh: true };
        Object.assign(props, options);
        props.ease = this._getEase(options);
        let bezierX, bezierY;
        props.onUpdate = () => {
            const { t } = _target;
            this.target.x = bezier(bezierX, t);
            this.target.y = bezier(bezierY, t);
        }
        this._timeline.call(() => {
            _target.t = 0;
            const { x, y } = this.target.position;
            let _x = x, _y = y;
            bezierX = [x, ...bezierList.map(p => _x += p.x)];
            bezierY = [y, ...bezierList.map(p => _y += p.y)];
        })
        this._timeline.to(_target, props);
        return this;
    }

    call(func) {
        this._timeline.call(func);
        return this;
    }

    delay(duration) {
        this._timeline.to(this.target, { duration });
        return this;
    }

    _getEase(options) {
        if (!(options?.easing)) return;
        const { easing } = options;
        if (easing.match(/outIn/)) console.warn("NOT support easing outIn");
        delete options.easing;
        return Ease[easing] || easing;
    }

    start() {
        this._timeline.play();
        return this;
    }

    stop() {
        for (let _id in this._relatedTimelines) {
            this._relatedTimelines[_id].kill();
            delete this._relatedTimelines[_id];
        }
        this._timeline.kill();
        delete Tween._tweenMap[this._id];
        return this;
    }

    then(tween) {
        const _id = Math.random().toString().slice(10);
        const timeLine = tween.getTimeline();
        timeLine.paused(false);
        this._relatedTimelines[_id] = timeLine;
        this._timeline.add(timeLine).call(() => { delete this._relatedTimelines[_id]; });
        return this;
    }

    pause() {
        this._timeline.pause();
        return this;
    }

    resume() {
        this._timeline.resume();
        return this;
    }

    union(){
        this._isUnion = true;
        return this;
    }

    repeat(times) {
        const tl = this._isUnion ? this._timeline : this._timeline.recent();
        tl.repeat(times);
        return this;
    }

    repeatForever() {
        const tl = this._isUnion ? this._timeline : this._timeline.recent();
        tl.repeat(-1);
        return this;
    }

    finally(callback) {
        this._onDone = callback;
        return this;
    }

    speed(speed) {
        this._timeline.timeScale(speed);
        return this;
    }

    sequence(...tweens){
        tweens.forEach(tween => this._timeline.add(tween.getTimeline().paused(false)));
        return this;
    }

    parallel(...tweens){
        const label = Date.now().toString();
        this._timeline.addLabel(label);
        tweens.forEach(tween => {
            let tl = tween.getTimeline();
            tl.paused(false);
            this._timeline.add(tl, label);
        });
        return this;
    }

    static stopAllByTarget(target) {
        for (let id in Tween._tweenMap) {
            let tween = Tween._tweenMap[id];
            if (tween.target === target) {
                tween.stop();
            }
        }
    }
}

export function tween(target) {
    return new Tween(target);
}

const Ease = {
    "quadIn": "power1.in", "quadOut": "power1.out", "quadInOut": "power1.inOut",
    "cubicIn": "power2.in", "cubicOut": "power2.out", "cubicInOut": "power2.inOut",
    "quartIn": "power3.in", "quartOut": "power3.out", "quartInOut": "power3.inOut",
    "quintIn": "power4.in", "quintOut": "power4.out", "quintInOut": "power4.inOut",
    "sineIn": "sine.in", "sineOut": "sine.out", "sineInOut": "sine.inOut",
    "expoIn": "expo.in", "expoOut": "expo.out", "expoInOut": "expo.inOut",
    "circIn": "circ.in", "circOut": "circ.out", "circInOut": "circ.inOut",
    "backIn": "back.in(2.5)", "backOut": "back.out(2.5)", "backInOut": "back.inOut(2.5)",
    "bounceIn": "bounce.in", "bounceOut": "bounce.out", "bounceInOut": "bounce.inOut",
}
