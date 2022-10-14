"use strict";
exports.__esModule = true;
var classes_1 = require("./classes");
function testGetCurrentState() {
    var video = new classes_1.StateMachine();
    video.start("stopped");
    var playState = new classes_1.State("playing");
    var stopState = new classes_1.State("stopped");
    var pauseState = new classes_1.State("paused");
    var states = [playState, stopState, pauseState];
    video.setStates(states);
    var playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    var stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    var pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    var transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: stopped");
    console.log("***************");
}
function testChangeMachineStateFromTrigger() {
    var video = new classes_1.StateMachine();
    video.start("stopped");
    var playState = new classes_1.State("playing");
    var stopState = new classes_1.State("stopped");
    var pauseState = new classes_1.State("paused");
    var states = [playState, stopState, pauseState];
    video.setStates(states);
    var playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    var stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    var pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
    var transitions = [playTransition, stopTransition, pauseTransition];
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
    var video = new classes_1.StateMachine();
    video.start("playing");
    var playState = new classes_1.State("playing");
    var stopState = new classes_1.State("stopped");
    var pauseState = new classes_1.State("paused");
    var states = [playState, stopState, pauseState];
    video.setStates(states);
    var playTransition = new classes_1.Transition("PLAY", [stopState, pauseState], playState);
    var stopTransition = new classes_1.Transition("STOP", [playState, pauseState], stopState);
    var transitions = [playTransition, stopTransition];
    video.setTransitions(transitions);
    var pauseTransition = new classes_1.Transition("PAUSE", [playState], pauseState);
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
