import { StateDiagram } from "./StateDiagram";
import StateMachine from "javascript-state-machine";
 
const transitions = [
    {
        name: 'gameStart',
        from: 'bootingGame',
        to: 'waitingAction'
    },
    {
        name: 'gameResume',
        from: '*',
        to: 'showingResult'
    },
    {
        name: 'actionTrigger',
        from: 'waitingAction',
        to: 'waitingResult'
    },
    {
        name: 'resultReceive',
        from: 'waitingResult',
        to: 'showingResult'
    },
    {
        name: 'gameRestart',
        from: 'showingResult',
        to: 'waitingAction'
    },
    {
        name: 'gameEnd',
        from: 'showingResult',
        to: 'closingGame'
    },
    {
        name: 'reboot',
        from: '*',
        to: 'bootingGame'
    },
];

const states = [
    "bootingGame","waitingAction","waitingResult","showingResult","closingGame", "bootingGame"
]

const fsm = new StateMachine({ transitions });
window.fsm = fsm;
const diagram = new StateDiagram(fsm, transitions);

