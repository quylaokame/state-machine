
export class TreeView {
   
    constructor(bTree) {
        this.bTree = bTree;
        this._initTree();
    }

    _initTree(){
        const {blackboard, tree} = this.bTree;
        console.log(this.bTree);
    }

}