import { State, StateMachine, Transition } from "./classes.js"

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

// function testChangeMachineStateFromTrigger(){
//     let video = new StateMachine("stopped");
//     let playState = new State("playing");
//     let stopState = new State("stopped");
//     let pauseState = new State("paused");
//     let states = [new State("playing"), new State("stopped"), new State("paused")];
//     video.states(states);
//     let transitions = [
//         new Transition("PLAY", [new State("stopped"), new State("paused")], new State("playing")),
//         new Transition("STOP", [new State("playing"), new State("paused")], new State("stopped")),
//         new Transition("PAUSE", [new State("playing")], new State("paused"))
//     ];
//     video.transitions(transitions);

//     video.transitionTo("PLAY");
//     console.log("Current state", video.currentState());
//     console.log("EXPECTED state: playing");

//     video.transitionTo("PAUSE");
//     console.log("Current state", video.currentState());
//     console.log("EXPECTED state: paused");

//     video.transitionTo("PLAY");
//     console.log("Current state", video.currentState());
//     console.log("EXPECTED state: playing");
// }

// function testAddNewTransition(){
//     let video = new StateMachine("playing");
//     let playState = new State("playing");
//     let stopState = new State("stopped");
//     let pauseState = new State("paused");
//     let states = [new State("playing"), new State("stopped"), new State("paused")];
//     video.states(states);
//     let transitions = [
//         new Transition("PLAY", [new State("stopped"), new State("paused")], new State("playing")),
//         new Transition("STOP", [new State("playing"), new State("paused")], new State("stopped")),
        
//     ];
//     video.transitions(transitions);

//     video.addTransition(new Transition("PAUSE", [new State("playing")], new State("paused")))

//     video.transitionTo("PAUSE");
//     console.log("Current state", video.currentState());
//     console.log("EXPECTED state: paused");
// }

console.log("TESTS");
testGetCurrentState();