const states5994 =  {
    0: {
        fsmState: 'Start_Table',
        nextState: [4],
        transition: 'goToStartGame'
    },
    4: {
        fsmState: 'Betting',
        nextState: [5, 0],
        transition: 'goToBetting'
    },
    5: {
        fsmState: 'End_Betting',
        nextState: [6, 0],
        transition: 'goToEndBetting'
    },
    6: {
        fsmState: 'Show_Result', 
        nextState: 7,
        transition: 'goToShowResult'
    },
    7: {
        fsmState: 'Show_Result', 
        nextState: 8,
        transition: 'goToShowResult'
    },
    8: {
        fsmState: 'Show_Result', 
        nextState: 9,
        transition: 'goToShowResult'
    },
    9: {
        fsmState: 'Show_Result', 
        nextState: 10,
        transition: 'goToShowResult'
    },
    10: {
        fsmState: 'Finish',
        nextState: 11,
        transition: 'goToFinish'
    },
    11: {
        fsmState: 'Finish', 
        nextState: 0,
        transition: 'goToFinish'
    }
};


function formatStates(states) {
    const serverStates = Object.keys(states).map(id => id + " - " + states[id].fsmState);
    const transitions = [];
    Object.keys(states).forEach(id => {
        let { fsmState: from, nextState } = states[id];
        if (!Array.isArray(nextState)) nextState = [nextState];
        nextState.forEach((nextId) => {
            const { fsmState: to, transition: name } = states[nextId];
            transitions.push({ name, from: id + " - " + from, to: nextId + " - " + to });
        })
    })
    console.error(serverStates);
    // console.error(JSON.stringify(transitions));
    return { serverStates, transitions };
}

formatStates(states5994);
