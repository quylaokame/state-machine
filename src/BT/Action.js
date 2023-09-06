import { ActionStatus } from "./Enum";

export class Action {

    constructor(script = null) {
        this.script = script;
        this.status = ActionStatus.Idle;
        this.children = [];
        this._index = 0;
    }

    addChild(action) {
        this.children.push(action);
        this.maxIndex = this.children.length;
    }

    tick() {
        this.status = ActionStatus.Running;
        this.execute();
    }

    execute() {
        if (!this.script) {
            this._changeStatus(this.status);
            return;
        }
        const { event, params } = this.script;
        this.dispatch(event, params, this);
    }

    _changeStatus(status) {
        this.status = status;
        this.parent && this.parent.emit("CHILD_UPDATE_STATUS",  this.status);
    }

    dispatch(event, params, this) {
        
    }

}

export function action(script){
    return new Action(script);
}