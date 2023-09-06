import BT from "./BT";

export class EnemyBot {

    constructor(){
        this.blackboard = {};
        this.bTree = new BT.Tree(this.blackboard);
        this._init();
    }

    conditions(){
        
    }

    beHit(data, callback) {

    }

    die() {
        
    }

    idle() {

    }

    attack() {

    }

    move() {

    }

}