import { Director } from "./view/Director";
import { TreeView } from "./behavior-tree/TreeView";
import { dogBehaviorTree } from "./behavior-tree/DogBehaviors";

const director = new Director();

const treeView = new TreeView(dogBehaviorTree);


