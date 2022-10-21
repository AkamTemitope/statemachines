"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
function testGetCurrentState() {
    let video = new classes_1.StateMachine();
    video.start("stopped");
    let playState = new classes_1.State("playing");
    let stopState = new classes_1.State("stopped");
    let pauseState = new classes_1.State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    let stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    let pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    let transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: stopped");
    console.log("***************");
}
function testChangeMachineStateFromTrigger() {
    let video = new classes_1.StateMachine();
    video.start("stopped");
    let playState = new classes_1.State("playing");
    let stopState = new classes_1.State("stopped");
    let pauseState = new classes_1.State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    let stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    let pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
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
function testAddNewTransition() {
    let video = new classes_1.StateMachine();
    video.start("playing");
    let playState = new classes_1.State("playing");
    let stopState = new classes_1.State("stopped");
    let pauseState = new classes_1.State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    let stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    let transitions = [playTransition, stopTransition];
    video.setTransitions(transitions);
    let pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    video.addTransition(pauseTransition);
    console.log("************************************************");
    video.transitionTo("PAUSE");
    console.log("TRANSITION FROM playing TO paused");
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: paused");
    console.log("************************************************");
}
function testAllowedTransitions() {
    let video = new classes_1.StateMachine();
    video.start("stopped");
    let playState = new classes_1.State("playing");
    let stopState = new classes_1.State("stopped");
    let pauseState = new classes_1.State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    let stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    let pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    let transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);
    if (video.possibleTransitions()[0] == "PLAY") {
        console.log("Correct");
        return;
    }
    console.log("Incorrect");
    return;
}
function testNotAllowedTransition() {
    let video = new classes_1.StateMachine();
    video.start("stopped");
    let playState = new classes_1.State("playing");
    let stopState = new classes_1.State("stopped");
    let pauseState = new classes_1.State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    let stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    let pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    let transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);
    video.transitionTo("PAUSE");
}
function testUndefinedTransition() {
    let video = new classes_1.StateMachine();
    video.start("stopped");
    let playState = new classes_1.State("playing");
    let stopState = new classes_1.State("stopped");
    let pauseState = new classes_1.State("paused");
    let states = [playState, stopState, pauseState];
    video.setStates(states);
    let playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    let stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    let pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    let transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);
    video.transitionTo("RESET");
}
console.log("TESTS");
testGetCurrentState();
// testChangeMachineStateFromTrigger();
// testAddNewTransition();
// testAllowedTransitions();
// testNotAllowedTransition();
// testUndefinedTransition();
