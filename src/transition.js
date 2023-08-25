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
        fsmState: 'Show_Result', // deal-cards
        nextState: 7,
        transition: 'goToShowResult'
    },
    7: {
        fsmState: 'Show_Result', // player-draw
        nextState: 8,
        transition: 'goToShowResult'
    },
    8: {
        fsmState: 'Show_Result', // host-play
        nextState: 9,
        transition: 'goToShowResult'
    },
    9: {
        fsmState: 'Show_Result', // SHOW_RESULT
        nextState: 10,
        transition: 'goToShowResult'
    },
    10: {
        fsmState: 'Finish',
        nextState: 11,
        transition: 'goToFinish'
    },
    11: {
        fsmState: 'Finish', // end game
        nextState: 0,
        transition: 'goToFinish'
    }
};


function formatStates(states) {
    const serverStates = Object.keys(states);
    const transitions = [];
    serverStates.forEach(id => {
        let { fsmState: from, nextState } = states[id];
        if (!Array.isArray(nextState)) nextState = [nextState];
        nextState.forEach((nextId) => {
            const { fsmState: to, transition: name } = states[nextId];
            transitions.push({ name, from, to });
        })
    })
    console.error(JSON.stringify(transitions));
    return { serverStates, transitions };
}

formatStates(states5994);

[
    {
            "from": "0",
            "to": 1,
            "name": "goToBetting"
    },
    {
            "from": "1",
            "to": 2,
            "name": "goToEndBetting"
    },
    {
            "from": "2",
            "to": 3,
            "name": "goToShowResult"
    },
    {
            "from": "2",
            "to": 4,
            "name": "goToFinish"
    },
    {
            "from": "3",
            "to": 4,
            "name": "goToFinish"
    },
    {
            "from": "4",
            "to": 0,
            "name": "goToStartGame"
    }
]