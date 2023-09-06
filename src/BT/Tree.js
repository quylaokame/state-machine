import EventEmitter from "events";
import { ActionType } from "./Enum";
import { Action } from "./Action";
import { Selector, select } from "./Selector";
import { Sequence, sequence } from "./Selector";
import { Parallel, parallel } from "./Parallel";

export class Tree extends EventEmitter {

    constructor(blackboard = {}, treeData) {
        super();
        this._treeData = {};
        this.treeData = treeData;
        this.blackboard = blackboard;
    }

    get treeData() { return this._treeData; }
    set treeData(value) {
        this._treeData = value;
        if (this._treeData) this._init();
    }
    _init() {
        const { type, script, children } = this._treeData;
        this.action = this._createAction(type, script);
        children.forEach(child => {
            this._instantiateAction(child, this.action);
        })
    }
    _instantiateAction(actionData, parentAction) {
        const { type, script, children } = actionData;
        const action = this._createAction(type, script);
        parentAction.addChild(action);
        children.forEach((child) => {
            this._instantiateAction(child, action);
        });
    }
    _createAction(type, script) {
        switch (type) {
            case ActionType.Executor: return new Action(script);
            case ActionType.Selector: return new Selector(script);
            case ActionType.Sequence: return new Sequence(script);
            case ActionType.Parallel: return new Parallel(script);
        }
    }

    tick() {
        this.action.tick();
    }

    sequence(...actions) {
        this.addChild(sequence(...actions));
    }

    parallel(...actions) {
        this.addChild(parallel(...actions));
    }k

    select(...actions) {
        this.addChild(select(...actions));
    }

    do(action) {
        this.addChild(action);
    }

}

