import { StateDiagram } from "./StateDiagram";
import StateMachine from "javascript-state-machine";
 
const transitions = [
    {
        name: 'goToStartGame',
        from: 'Start_Table',
        to: 'Betting'
    },
    {
        name: 'goToBetting',
        from: 'Betting',
        to: 'End_Betting'
    },
    {
        name: 'goToEndBetting',
        from: 'End_Betting',
        to: 'Show_Result'
    },
    {
        name: 'resume',
        from: 'End_Betting',
        to: 'Finish'
    },
    {
        name: 'goToShowResult',
        from: 'Show_Result',
        to: 'Finish'
    },
    {
        name: 'goToFinish',
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

