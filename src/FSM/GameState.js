import { StateDiagram } from "./StateDiagram";
import StateMachine from "javascript-state-machine";


const availableStates = {
    idle: ["hit01", "hit02", "attack"],
    hit01: ["stunned", "hit02", "idle"],
    hit02: ["standup", "idle", "die"],
    stunned: ["hit01", "hit02", "idle"],
    standup: ["idle", "hit01", "hit02"],
    attack: ["idle"],
    die: ["idle"]
}

function getTransitions(availableStates) {
    const transitions = [];
    for (let currentState in availableStates) {
        let toStates = availableStates[currentState];
        toStates.forEach((to) => {
            transitions.push({ name: "goto_" + to, from: currentState, to });
        })
    }
    return transitions;
}

const transitions = getTransitions(availableStates);

const states = ["idle", "hit01", "hit02", "standup", "stunned", "attack", "die"]

const fsm = new StateMachine({ transitions });
window.fsm = fsm;
const diagram = new StateDiagram(fsm, transitions, states);

