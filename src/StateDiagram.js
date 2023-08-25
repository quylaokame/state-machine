import { v2, randRangeInt} from "./Math";
export class StateDiagram {
    constructor(fsm, transitions, states) {
        this.fsm = fsm;
        this.transitions = transitions;
        this.states = states;
        const canvas = this.canvas = document.createElement("canvas");
        canvas.style.border = "2px solid black";
        canvas.style.position = "absolute";
        canvas.style.margin = "0";
        document.body.appendChild(canvas);

        document.body.style.overflow = "hidden";
        document.body.style.padding = "10px";
        this.context = canvas.getContext("2d");

        this._init();
        this._onResize();
        // window.addEventListener("resize", this._onResize.bind(this));
    }
    _init() {
        this._stateElements = {};
        let count = 0;
        this.states.forEach((state) => {
            if (state === "none") return;
            this._stateElements[state] = this._createState(state, count);
            count++;
        });
    }
    _createState(state, index){
        const div = document.createElement("div");
        document.body.appendChild(div);
        div.zIndex = 3;
        div.innerHTML = state;
        div.style.top = `${100 + 150 * index}px`;
        div.style.left = `50%`;
        div.style.padding = "10px 20px";
        div.style.transform = "translateX(-50%) translateY(-50%)";
        div.style.position = "absolute";
        div.style.border = "2px solid black"
        div.style.borderRadius = "10px";
        this._listenEvents(div);
        return div;
    }

    _onResize() {
        this.canvas.width = window.innerWidth - 40;
        this.canvas.height = window.innerHeight -40;
        this._clear();
        this._draw();
    }
    _clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.width);
    }
    _draw() {
        for (let index in this.transitions) {
            let { name, from, to } = this.transitions[index];
            const direction = ((index % 2) === 0) ? 1 : -1;
            if (Array.isArray(from)) {
                continue;
            } else if (from === "*" || from === "none") {
                continue;
            }
            let p1 = this._stateElements[from].getBoundingClientRect();
            let p4 = this._stateElements[to].getBoundingClientRect();

            if (direction > 0) {
                p1 = v2(p1.x + p1.width - 20, p1.y);
                p4 = v2(p4.x + p4.width - 20, p4.y);
            } else {
                p1 = v2(p1.x - 20, p1.y);
                p4 = v2(p4.x - 20, p4.y);
            }
            const diffX = Math.abs(p4.y - p1.y) * direction * .75;
            const p2 = v2(p1.x + diffX, (p1.y + p4.y) / 2);
            const p3 = p2;
            this._drawTransition(p1, p2, p3, p4);
        }
    }

    _drawTransition(p1, p2, p3, p4) {
        p4 = v2(p4.x + randRangeInt(-5, 5), p4.y + randRangeInt(-15, 15));
        const ctx = this.context;
        ctx.beginPath();
        ctx.strokeStyle = p4.y > p1.y ? "blue" : "red";
        ctx.lineWidth = 2;
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
        ctx.stroke();
        this._drawArrow(p3,p4);
    }

    _drawArrow(p1,p2){
        const ctx = this.context;
        ctx.lineWidth = 1;
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const headlen = 12; 
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p2.x - headlen * Math.cos(angle - Math.PI / 6), p2.y - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p2.x - headlen * Math.cos(angle + Math.PI / 6), p2.y - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }
    
    _listenEvents(div) {
        this.isHolding = false;
        //handle touch
        div.addEventListener('touchstart', this._onTouchStart.bind(this));
        div.addEventListener('touchmove', this._onTouchMove.bind(this));
        div.addEventListener('touchend', this._onTouchEnd.bind(this));
        div.addEventListener('touchcancel', this._onTouchEnd.bind(this));
        //handle mouse
        div.addEventListener('mousedown', this._onTouchStart.bind(this));
        div.addEventListener('mouseenter', this._onMouseEnter.bind(this));
        div.addEventListener('mousemove', this._onTouchMove.bind(this));
        div.addEventListener('mouseup', this._onTouchEnd.bind(this));
        div.addEventListener('mouseleave', this._onTouchEnd.bind(this));
        div.addEventListener('mouseleave', this._onMouseLeave.bind(this));
        div.addEventListener('mousecancel', this._onTouchEnd.bind(this));
    }

    _onTouchStart(evt) {
        this._currentDiv = evt.currentTarget;
        const { clientX, clientY } = evt;
        const boundingRect = this._currentDiv.getBoundingClientRect();
        const { x, y } = boundingRect;
        this._offsetX = clientX - x;
        this._offsetY = clientY - y;
        document.body.style.cursor = "grabbing";
    }

    _onMouseEnter() {
        document.body.style.cursor = "grab";
    }
    _onMouseLeave() {
        document.body.style.cursor = "auto";
    }

    _onTouchMove(evt) {
        if (!this._currentDiv) return;
        document.body.style.cursor = "grabbing";
        const { clientX, clientY } = evt;
        let newX = clientX - this._offsetX;
        let newY = clientY - this._offsetY;
        const { width, height } = this._currentDiv.getBoundingClientRect();
        this._currentDiv.style.left = `${~~(newX + width / 2)}px`;
        this._currentDiv.style.top = `${~~(newY + height / 2)}px`;
        if (this._timeOut) clearTimeout(this._timeOut);
        this._timeOut = setTimeout(() => {
            this._clear();
            this._draw();
        }, 100);
    }

    _onTouchEnd() {
        this.isHolding = false;
        this._currentDiv = null;
    }

}