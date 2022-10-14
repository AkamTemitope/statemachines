"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.State = exports.Transition = exports.StateMachine = void 0;
var StateMachine = /** @class */ (function () {
    function StateMachine() {
        this.states = [];
        this.transitions = [];
        this.initialState = "";
        this.currentState = "";
    }
    StateMachine.prototype.start = function (initialState) {
        this.states = [];
        this.transitions = [];
        this.initialState = initialState;
        this.currentState = initialState;
    };
    StateMachine.prototype.stop = function () {
        this.currentState = this.initialState;
    };
    StateMachine.prototype.setStates = function (states) {
        this.states = states;
    };
    StateMachine.prototype.addState = function (state) {
        var states = __spreadArray([state], this.states, true);
        this.states = states;
    };
    StateMachine.prototype.setTransitions = function (transitions) {
        this.transitions = transitions;
    };
    StateMachine.prototype.addTransition = function (transition) {
        var transitions = __spreadArray([transition], this.transitions, true);
        this.transitions = transitions;
    };
    StateMachine.prototype.getCurrentState = function () {
        return this.currentState;
    };
    StateMachine.prototype.updateCurrentState = function (currentState) {
        this.currentState = currentState;
    };
    StateMachine.prototype.transitionTo = function (trigger) {
        var transition = this.findTransition(trigger);
        if (!transition) {
            console.log("______Transition not defined_______");
            // error state
            return;
        }
        if (!this.possibleTransitions().includes(trigger)) {
            console.log("________Transition not allowed________ ");
            return;
        }
        this.currentState = transition.toState.stateName;
        return;
    };
    StateMachine.prototype.canTransitionTo = function (trigger) {
        var transition = this.findTransition(trigger);
        return transition && this.possibleTransitions().includes(trigger);
    };
    StateMachine.prototype.possibleTransitions = function () {
        var cs = this.currentState;
        var possibleTransitions = this.transitions.filter(function (transition) {
            var fromStates = transition.fromStates;
            return fromStates.filter(function (fromState) { return fromState.stateName == cs; })[0];
        });
        return possibleTransitions.map(function (transition) { return transition.trigger; });
    };
    StateMachine.prototype.findTransition = function (trigger) {
        return this.transitions.filter(function (transition) { return transition.trigger == trigger; })[0];
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
var Transition = /** @class */ (function () {
    function Transition(trigger, fromStates, toState) {
        this.trigger = trigger;
        this.fromStates = fromStates;
        this.toState = toState;
    }
    Transition.prototype.addFromState = function (state) {
        var states = this.fromStates;
        this.fromStates = __spreadArray([state], states, true);
    };
    Transition.prototype.updateToState = function (state) {
        this.toState = state;
    };
    return Transition;
}());
exports.Transition = Transition;
var State = /** @class */ (function () {
    function State(name) {
        this.stateName = name;
    }
    State.prototype.updateStateName = function (newName) {
        this.stateName = newName;
    };
    return State;
}());
exports.State = State;
function testGetCurrentState() {
    var video = new StateMachine();
    video.start("stopped");
    var playState = new State("playing");
    var stopState = new State("stopped");
    var pauseState = new State("paused");
    var states = [playState, stopState, pauseState];
    video.setStates(states);
    var playTransition = new Transition("PLAY", [stopState, pauseState], playState);
    var stopTransition = new Transition("STOP", [playState, pauseState], stopState);
    var pauseTransition = new Transition("PAUSE", [playState], pauseState);
    var transitions = [playTransition, stopTransition, pauseTransition];
    video.setTransitions(transitions);
    console.log("Current state:    ", video.getCurrentState());
    console.log("EXPECTED state: stopped");
    console.log("***************");
}
function testChangeMachineStateFromTrigger() {
    var video = new StateMachine();
    video.start("stopped");
    var playState = new State("playing");
    var stopState = new State("stopped");
    var pauseState = new State("paused");
    var states = [playState, stopState, pauseState];
    video.setStates(states);
    var playTransition = new Transition("PLAY", [stopState, pauseState], playState);
    var stopTransition = new Transition("STOP", [playState, pauseState], stopState);
    var pauseTransition = new Transition("PAUSE", [playState], pauseState);
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
    var video = new StateMachine();
    video.start("playing");
    var playState = new State("playing");
    var stopState = new State("stopped");
    var pauseState = new State("paused");
    var states = [playState, stopState, pauseState];
    video.setStates(states);
    var playTransition = new Transition("PLAY", [stopState, pauseState], playState);
    var stopTransition = new Transition("STOP", [playState, pauseState], stopState);
    var transitions = [playTransition, stopTransition];
    video.setTransitions(transitions);
    var pauseTransition = new Transition("PAUSE", [playState], pauseState);
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
