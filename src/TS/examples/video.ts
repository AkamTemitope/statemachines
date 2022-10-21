import { writeFileSync } from "fs";
import { State, StateMachine, Transition } from "../classes";
import { stateMachineSvgGraph, visualise } from "../visualise";


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

let smname, orientation;
smname = "video";
orientation = "horizontal";
let dotText = visualise(video, smname, orientation);
writeFileSync("./examples/"+smname + ".dot", dotText);
stateMachineSvgGraph(dotText, "./examples/"+smname);