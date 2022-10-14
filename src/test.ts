import { State, StateMachine, Transition } from "./classes";

function testGetCurrentState() {

    let video = new StateMachine();
    video.start("stopped");
    let playState = new State("playing");
    let stopState = new State("stopped");
    let pauseState = new State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new Transition("PLAY", [stopState, pauseState], playState)
    let stopTransition = new Transition("STOP", [playState, pauseState], stopState)
    let pauseTransition = new Transition("PAUSE", [playState], pauseState)
    let transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);

    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: stopped");
    console.log("***************");
}


function testChangeMachineStateFromTrigger(){
    let video = new StateMachine();
    video.start("stopped");
    let playState = new State("playing");
    let stopState = new State("stopped");
    let pauseState = new State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new Transition("PLAY", [stopState, pauseState], playState)
    let stopTransition = new Transition("STOP", [playState, pauseState], stopState)
    let pauseTransition = new Transition("PAUSE", [playState], pauseState)
    let transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);

    console.log("************************************************");
    video.transitionTo("PLAY");
    console.log("TRANSITION FROM stopped TO playing");
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: playing");
    console.log("************************************************");

    console.log("************************************************");
    video.transitionTo("STOP");
    console.log("TRANSITION FROM playing TO stopped");
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: stopped");
    console.log("************************************************");

    console.log("************************************************");
    video.transitionTo("PAUSE");
    console.log("TRANSITION FROM stopped TO paused, NOT POSSIBLE");
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: stopped");
    console.log("************************************************");

    console.log("************************************************");
    video.transitionTo("PLAY");
    console.log("TRANSITION FROM stopped TO playing");
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: playing");
    console.log("************************************************");

}

function testAddNewTransition(){
    let video = new StateMachine();
    video.start("playing");
    let playState = new State("playing");
    let stopState = new State("stopped");
    let pauseState = new State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new Transition("PLAY", [stopState, pauseState], playState)
    let stopTransition = new Transition("STOP", [playState, pauseState], stopState)
    let transitions = [playTransition, stopTransition];
    video.setTransitions(transitions);
    
    let pauseTransition = new Transition("PAUSE", [playState], pauseState)
    video.addTransition(pauseTransition);

    console.log("************************************************");
    video.transitionTo("PAUSE");
    console.log("TRANSITION FROM playing TO paused");
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: paused");
    console.log("************************************************");
}


console.log("TESTS");
// testGetCurrentState();
// testChangeMachineStateFromTrigger();
testAddNewTransition();