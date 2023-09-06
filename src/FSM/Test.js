
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
    for(let currentState in availableStates){
        let toStates = availableStates[currentState];
        toStates.forEach((to) => {
            transitions.push({ name: "goto_" + to, from: currentState, to });
        })
    }  
    return transitions;
}

convertStates(enemyStates);


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
    const result = { serverStates, transitions }
    console.error(JSON.stringify(result));
    return result;
}


