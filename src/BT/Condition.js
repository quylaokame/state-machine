import EventEmitter from "events";
import { ActionStatus, ActionType } from "./Enum";

export class Condition extends EventEmitter {

    constructor(script) {
        this.type = ActionType.Condition;
        this.script = script;
        this.status = ActionStatus.Idle;
        this._status = this.status;
        this.children = [];
        this._index = 0;
        this.on("CHILD_UPDATE_STATUS", this.onChildUpdateStatus, this);
    }

    addChild(action) {
        this.children.push(action);
        this.maxIndex = this.children.length;
    }

    execute() {
        if (!this.script) {
            this._changeStatus(this.status);
            return;
        }
        const { func, context, params } = this.script;
        const status = func.call(context, params);
        this._changeStatus(status);
    }


}