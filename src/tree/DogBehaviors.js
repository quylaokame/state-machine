import { BehaviorTree, Sequence, Task, SUCCESS, FAILURE } from 'behaviortree';
import { Dog } from "./Dog";

BehaviorTree.register('bark', new Task({
    run: function (dog) {
        dog.bark()
        return SUCCESS
    }
}))

const tree = new Sequence({
    nodes: [
        'bark',
        new Task({
            run: function (dog) {
                dog.randomlyWalk()
                return SUCCESS
            }
        }),
        'bark',
        new Task({
            run: function (dog) {
                if (dog.standBesideATree()) {
                    dog.liftALeg()
                    dog.pee()
                    return SUCCESS
                } else {
                    return FAILURE
                }
            }
        })
    ]
})

const dog = new Dog();

const bTree = new BehaviorTree({
    tree: tree,
    blackboard: dog
})

// The "game" loop:
setInterval(function () {
    bTree.step()
}, 1000 / 60)

export class DogBehavior {
    constructor() {
        this.bTree = new BehaviorTree({
            tree: tree,
            blackboard: dog
        })
    }
}