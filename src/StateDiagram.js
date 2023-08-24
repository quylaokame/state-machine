import { v2, randRangeInt} from "./Math";
export class StateDiagram {
    constructor(fsm, transitions) {
        this.fsm = fsm;
        this.transitions = transitions;
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
        const states = this.fsm.allStates();
        const transitions = this.fsm.transitions();
        console.log(states, transitions);
        let count = 0;
        states.forEach((state) => {
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
            const { name, from, to } = this.transitions[index];
            const direction = ((index % 2) === 0) ? 1 : -1;
            if (Array.isArray(from) || from === "*" || from === "none") continue;
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
            const p2 = v2(p1.x + diffX, p1.y);
            const p3 = v2(p1.x + diffX, p4.y);
            this._drawTransitionArrow(p1, p2, p3, p4);
        }
    }

    _drawTransitionArrow(p1, p2, p3, p4) {
        p4 = v2(p4.x, p4.y + randRangeInt(-15, 15));
        const ctx = this.context;
        ctx.beginPath();
        ctx.strokeStyle = p4.y > p1.y ? "blue" : "red";
        ctx.lineWidth = 2;
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
        ctx.stroke();

        ctx.lineWidth = 2;
        var headlen = 12; // length of head in pixels
        const dy = p4.y - p4.y;
        const dx = p4.x - p3.x;
        var angle = Math.atan2(dy, dx);

        const arrowX = p4.x
        const arrowY = p4.y;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - headlen * Math.cos(angle - Math.PI / 6), arrowY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - headlen * Math.cos(angle + Math.PI / 6), arrowY - headlen * Math.sin(angle + Math.PI / 6));
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
        div.addEventListener('mousemove', this._onTouchMove.bind(this));
        div.addEventListener('mouseup', this._onTouchEnd.bind(this));
        div.addEventListener('mouseleave', this._onTouchEnd.bind(this));
        div.addEventListener('mousecancel', this._onTouchEnd.bind(this));
    }

    _onTouchStart(evt) {
        this._currentDiv = evt.currentTarget;
        const { clientX, clientY } = evt;
        const boundingRect = this._currentDiv.getBoundingClientRect();
        const { x, y } = boundingRect;
        this._offsetX = clientX - x;
        this._offsetY = clientY - y;
        console.log(clientX,clientY);
        console.log(x, y);
    }

    _onTouchMove(evt) {
        if (!this._currentDiv) return;
        const { clientX, clientY } = evt;
        let newX = clientX - this._offsetX;
        let newY = clientY - this._offsetY;
        const { width, height } = this._currentDiv.getBoundingClientRect();
        this._currentDiv.style.left = `${~~(newX + width / 2)}px`;
        this._currentDiv.style.top = `${~~(newY + height / 2)}px`;
        this._clear();
        this._draw();
    }

    _onTouchEnd() {
        this.isHolding = false;
        this._currentDiv = null;
    }

}