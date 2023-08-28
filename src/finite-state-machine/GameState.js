import { StateDiagram } from "./fsm/StateDiagram";
import StateMachine from "javascript-state-machine";

const transitions =[
    { name: "goToInit", from: "*", to: "Init" },
    { name: "goToStartGame", from: "Init", to: "Start_Table" },
    { name: "goToStartGame", from: "Betting", to: "Start_Table" },
    { name: "goToStartGame", from: "End_Betting", to: "Start_Table" },
    { name: "goToStartGame", from: "Finish", to: "Start_Table" },

    { name: "goToDealCard", from: "Init", to: "Deal_Card" },
    { name: "goToDealCard", from: "Start_Table", to: "Deal_Card" },
    { name: "goToDealCard", from: "Finish", to: "Deal_Card" },

    { name: "goToBetting", from: "Init", to: "Betting" },
    { name: "goToBetting", from: "Deal_Card", to: "Betting" },
    { name: "goToBetting", from: "Show_Result", to: "Betting" }, // two phase betting mode
    { name: "goToBetting", from: "Start_Table", to: "Betting" }, // skip deal-card mode.

    { name: "goToEndBetting", from: "Init", to: "End_Betting" },
    { name: "goToEndBetting", from: "Betting", to: "End_Betting" },

    { name: "goToShowResult", from: "Init", to: "Show_Result" },
    { name: "goToShowResult", from: "End_Betting", to: "Show_Result" },

    { name: "goToFinish", from: "Init", to: "Finish" },
    { name: "goToFinish", from: "Show_Result", to: "Finish" },

    { name: "goToIdle", from: "*", to: "Idle" },
]

const states = [
    'Init',
    'Start_Table',
    'Deal_Card',
    'Betting',
    'End_Betting',
    'Show_Result',
    'Finish',
]

const fsm = new StateMachine({ transitions: transitions });
window.fsm = fsm;
const diagram = new StateDiagram(fsm, transitions, states);

