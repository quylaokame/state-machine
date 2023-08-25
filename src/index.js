import { StateDiagram } from "./StateDiagram";
import StateMachine from "javascript-state-machine";

const transitions = [
    {
        "name": "goToBetting",
        "from": "0 - Start_Table",
        "to": "4 - Betting"
    },
    {
        "name": "goToEndBetting",
        "from": "4 - Betting",
        "to": "5 - End_Betting"
    },
    {
        "name": "goToStartGame",
        "from": "4 - Betting",
        "to": "0 - Start_Table"
    },
    {
        "name": "dealCards",
        "from": "5 - End_Betting",
        "to": "6 - Show_Result"
    },
    {
        "name": "goToStartGame",
        "from": "5 - End_Betting",
        "to": "0 - Start_Table"
    },
    {
        "name": "playerDraw",
        "from": "6 - Show_Result",
        "to": "7 - Show_Result"
    },
    {
        "name": "hostPlay",
        "from": "7 - Show_Result",
        "to": "8 - Show_Result"
    },
    {
        "name": "goToShowResult",
        "from": "8 - Show_Result",
        "to": "9 - Show_Result"
    },
    {
        "name": "goToFinish",
        "from": "9 - Show_Result",
        "to": "10 - Finish"
    },
    {
        "name": "endGame",
        "from": "10 - Finish",
        "to": "11 - Finish"
    },
    {
        "name": "goToStartGame",
        "from": "11 - Finish",
        "to": "0 - Start_Table"
    }
]

const states = [
    '0 - Start_Table',
    '4 - Betting',
    '5 - End_Betting',
    '6 - Show_Result',
    '7 - Show_Result',
    '8 - Show_Result',
    '9 - Show_Result',
    '10 - Finish',
    '11 - Finish'
]

const fsm = new StateMachine({ transitions: transitions });
window.fsm = fsm;
const diagram = new StateDiagram(fsm, transitions, states);

