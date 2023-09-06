import EventEmitter from "events";
import { ActionStatus } from "./Enum";
import { Action } from "./Action";

export class Sequence extends Action {

    constructor(type, script) {
        super(type, script);
        this.failAction = null;
    }

    tick() {
        this.failAction = null;
        this.status = ActionStatus.Running;
        this._tickChild(0);
    }

    _tickChild(index) {
        this._index = index;
        const child = this.children[this._index];
        child.tick();
    }

    onChildUpdateStatus(status, action) {
        if (status === ActionStatus.Failure) {
            this.failAction = action;
            this._changeStatus(status);
            return;
        }

        if (status === ActionStatus.Success) {
            if (this._index === this.maxIndex) {
                this._changeStatus(status);
            } else {
                this._tickChild(this._index + 1);
            }
        }
    }

}

export function sequence(...actions) {
    const sequenceAction = new Sequence();
    actions.forEach(action => sequenceAction.addChild(action));
    return sequenceAction;
}