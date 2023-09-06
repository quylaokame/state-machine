import { ActionStatus, ActionType } from "./Enum";
import { Action } from "./Action";

export class Parallel extends Action {

    constructor(){
        super(ActionType.Parallel, script);
        this.selectAction = null;
        this._countSuccess = 0;
        this._countFail = 0;
    }

    minSuccess(minSuccess) {
        this.minSuccess = minSuccess;
    }

    minFail(minFail) {
        this.minFail = minFail;
    }

    tick() {
        this.status = ActionStatus.Running;
        this.children.forEach((child) => child.tick());
    }

    onChildUpdateStatus(status, action) {
        if (status === ActionStatus.Success) {
            this._countSuccess++;
            if (this._countSuccess >= this.minSuccess) {
                this._changeStatus(ActionStatus.Success);
                return;
            }
        } else if (status === ActionStatus.Failure) {
            this._countFail++;
            if (this._countFail >= this.minFail) {
                this._changeStatus(ActionStatus.Failure);
                return;
            }
        }
    }
}

export function parallel(...actions) {
    const parallelAction = new Parallel();
    actions.forEach(action => parallelAction.addChild(action));
    return parallelAction;
}