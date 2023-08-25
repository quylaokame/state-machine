const testStates = {
    0: { fsmState: 'Start_Table', nextState: [4], transition: 'goToStartGame' },
    4: { fsmState: 'Betting', nextState: [5, 0], transition: 'goToBetting' },
    5: { fsmState: 'End_Betting', nextState: [6, 0], transition: 'goToEndBetting' },
    6: { fsmState: 'Show_Result', nextState: 7, transition: 'goToShowResult' },
    7: { fsmState: 'Show_Result', nextState: 8, transition: 'goToShowResult' },
    8: { fsmState: 'Show_Result', nextState: 9, transition: 'goToShowResult' },
    9: { fsmState: 'Show_Result', nextState: 10, transition: 'goToShowResult' },
    10: { fsmState: 'Finish', nextState: 11, transition: 'goToFinish' },
    11: { fsmState: 'Finish', nextState: 0, transition: 'goToFinish' }
};

const states5994 = {
    0: { fsmState: "Start_Table", nextState: [1], transition: "goToStartGame", },
    1: { fsmState: "Betting", nextState: 2, transition: "goToBetting", },
    2: { fsmState: "End_Betting", nextState: [3, 4], transition: "goToEndBetting", },
    3: { fsmState: "Show_Result", nextState: [4], transition: "goToShowResult", },
    4: { fsmState: "Finish", nextState: 0, transition: "goToFinish", },
};

function convertTransitions(states) {
    const transitions = [];
    for (let state in states) { const { fsmState, nextState, transition } = states[state]; let to = nextState; if (Array.isArray(nextState)) {     to = nextState.map(id => states[id].fsmState); } else {     to = [states[nextState].fsmState] } const data = { name: transition, "from": fsmState, to }; transitions.push(data);
    }
    console.log(JSON.stringify(transitions, null, "\t"));
}

// convertTransitions(testStates);
convertTransitions(states5994);

const transitionTest = [
    { "name": 'goToStartGame', "from": 'Start_Table', "to": ['Betting'] },
    { "name": 'goToBetting', "from": 'Betting', "to": ['End_Betting', 'Start_Table'] },
    { "name": 'goToEndBetting', "from": 'End_Betting', "to": ['Show_Result', 'Start_Table'] },
    { "name": 'goToShowResult', "from": 'Show_Result', "to": ['Show_Result'] },
    { "name": 'goToShowResult', "from": 'Show_Result', "to": ['Show_Result'] },
    { "name": 'goToShowResult', "from": 'Show_Result', "to": ['Show_Result'] },
    { "name": 'goToShowResult', "from": 'Show_Result', "to": ['Finish'] },
    { "name": 'goToFinish', "from": 'Finish', "to": ['Finish'] },
    { "name": 'goToFinish', "from": 'Finish', "to": ['Start_Table'] }
]

const transitions5994 = [
    { "name": "goToStartGame", "from": "Start_Table", "to": ["Betting"] },
    { "name": "goToBetting", "from": "Betting", "to": ["End_Betting"] },
    { "name": "goToEndBetting", "from": "End_Betting", "to": ["Show_Result", "Finish"] },
    { "name": "goToShowResult", "from": "Show_Result", "to": ["Finish"] },
    { "name": "goToFinish", "from": "Finish", "to": ["Start_Table"] }
]