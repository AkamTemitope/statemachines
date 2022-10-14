class StateMachine {

    states;
    transitions;
    initialState;
    currentState;

    constructor(initialState){
        this.states = [];
        this.transitions = [];
        this.initialState = initialState;
        this.currentState = initialState;

    }

    states(states) {
        this.states = states;
        return this;
    }

    addState(state){
        let states = [state, ...this.states];
        this.states = states;
        return this;
    }

    transitions(transitions){
        this.transitions = transitions;
        return this;
    }

    addTransition(transition){
        let transitions = [transition, ...this.transitions];
        this.transitions = transitions;
        return this;
    }

    currentState(){
        return this.currentState;
    }

    updateCurrentState(currentState){
        this.currentState = currentState;
    }

    transitionTo(trigger){
        let transition = this.findTransition(trigger);

        if(!transition){
            console.log("Transition not defined");
            // error state
            return;
        }

        if (!this.possibleTransitions().includes(trigger)){
            console.log("Transition not allowed");
            return;
        }

        this.currentState = transition.toStates;
        return this;

    }

    canTransitionTo(trigger){
        let transition = this.findTransition(trigger);
        return transition && this.possibleTransitions().includes(trigger);
    }

    possibleTransitions(){

        let possibleTransitions = this.transitions.filter(function(transition) {
            let fromStates = transition.fromStates;
            return fromStates.filter((fromState) => fromState.stateName == this.currentState())
        });

        return possibleTransitions.map((transition) => transition.trigger);
    }

    findTransition(trigger){
        return this.transitions.filter((transition) => transition.trigger == trigger);
    }



}

class Transition {

    trigger;
    fromStates;
    toState;


    constructor(trigger, fromStates, toState){
        this.trigger = trigger;
        this.fromStates = fromStates;
        this.toState = toState;
    }

    addFromState(state){
        states = this.fromStates
        this.fromStates = [state, ...states]
    }

    updateToState(state){
        this.toState = state;
    }


}

class State {

    stateName;

    constructor(name){
        this.stateName = name;
    }

    updateStateName(newName){
        this.stateName = newName;
    }

}



function testGetCurrentState() {

    let video = new StateMachine("stopped");
    let playState = new State("playing");
    let stopState = new State("stopped");
    let pauseState = new State("paused");
    let states = [playState, stopState, pauseState];
    video.states(states);
    let playTransition = new Transition("PLAY", [stopState, pauseState], playState)
    let stopTransition = new Transition("STOP", [playState, pauseState], stopState)
    let pauseTransition = new Transition("PAUSE", [playState], pauseState)
    let transitions = [
        playTransition,
        stopTransition,
        pauseTransition
    ];
    video.transitions(transitions);

    console.log("Current state", video.currentState());
    console.log("EXPECTED state: stopped");
}


console.log("TESTS");
testGetCurrentState();