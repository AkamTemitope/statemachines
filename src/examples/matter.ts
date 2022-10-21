import { writeFileSync } from "fs";
import { State, StateMachine, Transition } from "../classes";
import { stateMachineSvgGraph, visualise } from "../visualise";


let matter = new StateMachine();
matter.start("solid");
let solidState = new State("solid");
let liquidState = new State("liquid");
let gasState = new State("gas");
let states = [solidState, liquidState, gasState];
matter.setStates(states);
let meltTransition = new Transition("MELT", [solidState], liquidState)
let freezeTransition = new Transition("FREEZE", [liquidState], solidState)
let vapTransition = new Transition("VAPORIZE", [liquidState], gasState)
let conTransition = new Transition("CONDENSE", [gasState], liquidState)
let transitions = [meltTransition, freezeTransition, vapTransition, conTransition];
matter.setTransitions(transitions);

let smname, orientation;
smname = "matter";
orientation = "horizontal";
let dotText = visualise(matter, smname, orientation);
writeFileSync("./examples/"+smname + ".dot", dotText);
stateMachineSvgGraph(dotText, "./examples/"+smname);