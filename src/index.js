import { StateDiagram } from "./StateDiagram";
import StateMachine from "javascript-state-machine";
 
const transitions =  [
    { name: 'start', from: 'none', to: 'green' },
    { name: 'warn', from: 'green', to: 'yellow' },
    { name: 'panic', from: 'green', to: 'red' },
    { name: 'panic', from: 'yellow', to: 'red' },
    { name: 'calm', from: 'red', to: 'yellow' },
    { name: 'clear', from: 'red', to: 'green' },
    { name: 'clear', from: 'yellow', to: 'green' },
]

const fsm = new StateMachine({ transitions });
window.fsm = fsm;
const diagram = new StateDiagram(fsm, transitions);

