import { ActionStatus, ActionType } from "./Enum";
import { Action } from "./Action";

export class Selector extends Action {

    constructor(){
        super();
        this.selectAction = null;
    }

    tick() {
        this.status = ActionStatus.Running;
        this._tickChild(0);
    }

    _tickChild(index) {
        this._index = index;
        const child = this.children[this._index];
        child.tick();
    }

    onChildUpdateStatus(status, action) {
        if (status === ActionStatus.Success) {
            this.selectAction = action;
            this._changeStatus(status);
            return;
        }

        if (status === ActionStatus.Failure) {
            if (this._index === this.maxIndex) {
                this._changeStatus(status);
            } else {
                this._tickChild(this._index + 1);
            }
        }
    }

}

export function select(...actions) {
    const selectorAction = new Selector();
    actions.forEach(action => selectorAction.addChild(action));
    return selectorAction;
}