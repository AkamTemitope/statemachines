"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Transition = exports.StateMachine = void 0;
class StateMachine {
    constructor() {
        this.states = [];
        this.transitions = [];
        this.initialState = "";
        this.currentState = "";
    }
    start(initialState) {
        this.states = [];
        this.transitions = [];
        this.initialState = initialState;
        this.currentState = initialState;
    }
    stop() {
        this.currentState = this.initialState;
    }
    setStates(states) {
        this.states = states;
    }
    getStates() {
        return this.states;
    }
    addState(state) {
        let states = [state, ...this.states];
        this.states = states;
    }
    setTransitions(transitions) {
        this.transitions = transitions;
    }
    getTransitions() {
        return this.transitions;
    }
    addTransition(transition) {
        let transitions = [transition, ...this.transitions];
        this.transitions = transitions;
    }
    getCurrentState() {
        return this.currentState;
    }
    updateCurrentState(currentState) {
        this.currentState = currentState;
    }
    transitionTo(trigger) {
        var _a;
        let transition = this.findTransition(trigger);
        if (!transition) {
            console.log("______" + trigger + " Transition not defined_______");
            return;
        }
        if (!this.possibleTransitions().includes(trigger)) {
            console.log("________" + trigger + " Transition not allowed________ ");
            return;
        }
        transition.onBeforeTransition();
        (_a = transition.fromStates.find((state) => state.stateName == this.currentState)) === null || _a === void 0 ? void 0 : _a.onLeaveState();
        transition.toState.onEnterState();
        transition.onAfterTransition();
        this.currentState = transition.toState.stateName;
        return;
    }
    canTransitionTo(trigger) {
        let transition = this.findTransition(trigger);
        return transition && this.possibleTransitions().includes(trigger);
    }
    possibleTransitions() {
        let cs = this.currentState;
        let possibleTransitions = this.transitions.filter(function (transition) {
            let fromStates = transition.fromStates;
            return fromStates.filter((fromState) => fromState.stateName == cs)[0];
        });
        return possibleTransitions.map((transition) => transition.trigger);
    }
    findTransition(trigger) {
        return this.transitions.filter((transition) => transition.trigger == trigger)[0];
    }
}
exports.StateMachine = StateMachine;
class Transition {
    constructor(trigger, fromStates, toState) {
        this.trigger = trigger;
        this.fromStates = fromStates;
        this.toState = toState;
    }
    addFromState(state) {
        let states = this.fromStates;
        this.fromStates = [state, ...states];
    }
    updateToState(state) {
        this.toState = state;
    }
    onBeforeTransition() {
        console.log("BEFORE: ", this.trigger);
    }
    onAfterTransition() {
        console.log("AFTER: ", this.trigger);
    }
}
exports.Transition = Transition;
class State {
    constructor(name) {
        this.stateName = name;
    }
    updateStateName(newName) {
        this.stateName = newName;
    }
    onLeaveState() {
        console.log("LEAVE: ", this.stateName);
    }
    onEnterState() {
        console.log("ENTER: ", this.stateName);
    }
}
exports.State = State;
