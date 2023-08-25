import { StateDiagram } from "./StateDiagram";
import StateMachine from "javascript-state-machine";
 
const transitions = [
    {
        name: 'goToBetting',
        from: 'Start_Table',
        to: 'Betting'
    },
    {
        name: 'goToEndBetting',
        from: 'Betting',
        to: 'End_Betting'
    },
    {
        name: 'goToShowResult',
        from: 'End_Betting',
        to: 'Show_Result'
    },
    {
        name: 'goToFinish',
        from: 'Show_Result',
        to: 'Finish'
    },
    {
        name: 'goToStartGame',
        from: 'Finish',
        to: 'Start_Table'
    }
];

const states = [
    "Start_Table", "Betting", "End_Betting", "Show_Result", "Finish"
]

const fsm = new StateMachine({ transitions: transitions });
window.fsm = fsm;
const diagram = new StateDiagram(fsm, transitions, states);

