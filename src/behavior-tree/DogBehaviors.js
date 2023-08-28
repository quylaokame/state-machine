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

export const dogBehaviorTree = new BehaviorTree({
    tree: tree,
    blackboard: dog
})
