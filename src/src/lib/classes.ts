export class StateMachine {

    private states: Array<State>;
    private transitions: Array<Transition>;
    private initialState: string;
    private currentState: string;

    constructor(){
        this.states = [];
        this.transitions = [];
        this.initialState = "";
        this.currentState = "";

    }
    start(initialState: string){
        this.states = [];
        this.transitions = [];
        this.initialState = initialState;
        this.currentState = initialState;
    }

    stop(){
        this.currentState = this.initialState;
    }

    setStates(states: Array<State>) {
        this.states = states;
    }

    getStates(){
        return this.states;
    }

    addState(state: State){
        let states = [state, ...this.states];
        this.states = states;
    }

    setTransitions(transitions: Array<Transition>){
        this.transitions = transitions;
    }

    getTransitions(){
        return this.transitions;
    }

    addTransition(transition: Transition){
        let transitions = [transition, ...this.transitions];
        this.transitions = transitions;
    }

    getCurrentState(){
        return this.currentState;
    }

    updateCurrentState(currentState: string){
        this.currentState = currentState;
    }

    transitionTo(trigger: string){
        let transition = this.findTransition(trigger);

        if(!transition){
            console.log("______"+trigger+" Transition not defined_______");
            return;
        }

        if (!this.possibleTransitions().includes(trigger)){
            console.log("________"+trigger+" Transition not allowed________ ");
            return;
        }
        transition.onBeforeTransition();
        transition.fromStates.find((state) => state.stateName === this.currentState)?.onLeaveState();
        transition.toState.onEnterState();
        transition.onAfterTransition();
        this.currentState = transition.toState.stateName;
        return;
    }

    canTransitionTo(trigger: string){
        let transition = this.findTransition(trigger);
        return transition && this.possibleTransitions().includes(trigger);
    }

    possibleTransitions(){

        let cs = this.currentState;
        let possibleTransitions = this.transitions.filter(function(transition) {
            let fromStates = transition.fromStates;
           return fromStates.filter((fromState) => fromState.stateName === cs)[0];
        });

        return possibleTransitions.map((transition) => transition.trigger);
    }

    findTransition(trigger: string){
        return this.transitions.filter((transition) => transition.trigger === trigger)[0];
    }



}

export class Transition {

    trigger: string;
    fromStates: Array<State>;
    toState: State;


    constructor(trigger: string, fromStates: Array<State>, toState: State){
        this.trigger = trigger;
        this.fromStates = fromStates;
        this.toState = toState;
    }

    addFromState(state: State){
        let states = this.fromStates
        this.fromStates = [state, ...states]
    }

    updateToState(state: State){
        this.toState = state;
    }

    onBeforeTransition(){
        console.log("BEFORE: ", this.trigger)
    }
    onAfterTransition(){
        console.log("AFTER: ", this.trigger)
    }


}

export class State {

    stateName: string;

    constructor(name: string){
        this.stateName = name;
    }

    updateStateName(newName: string){
        this.stateName = newName;
    }
    onLeaveState(){
        console.log("LEAVE: ", this.stateName);
    }
    onEnterState(){
        console.log("ENTER: ", this.stateName);
    }

}