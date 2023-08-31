import { director } from "./lib/Director";
import { TreeView } from "./behavior-tree/TreeView";
import { dogBehaviorTree } from "./behavior-tree/DogBehaviors";

const treeView = new TreeView(dogBehaviorTree);

