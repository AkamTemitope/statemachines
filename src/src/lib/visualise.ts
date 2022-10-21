// import { writeFileSync } from "fs";
// import { renderDot } from "render-dot";
import { StateMachine } from "./classes";


export function visualise (sm: StateMachine, name: string, orientation: string){
    return dotify(dotcfg(sm, name, orientation));
}

function dotcfg(sm: StateMachine, name: string, orientation: string){

    let rankdir     = dotcfg.rankdir(orientation);
    let states      = dotcfg.states(sm);
    let transitions = dotcfg.transitions(sm);
    let result      = { } as config;

    if (name)
    result.name = name
  
    if (rankdir)
      result.rankdir = rankdir
  
    if (states && states.length > 0)
      result.states = states
  
    if (transitions && transitions.length > 0)
      result.transitions = transitions

    return result;

}

type config =  {
    name: string,
    rankdir: string,
    states: string[],
    transitions: Trans[]

}
type Trans = {
    from: string,
    to: string,
    name: string
}

dotcfg.rankdir = function(orientation: string) {
    if (orientation === 'horizontal')
      return 'LR';
    else if (orientation === 'vertical')
      return 'TB';
  }
  
  dotcfg.states = function(sm: StateMachine) {
    let states = sm.getStates();
    return states.map((state) => state.stateName);
  }


  dotcfg.transitions = function(sm: StateMachine) {
    
    let  transitions: Array<Trans> = [];

    let T = sm.getTransitions();
    for (let n = 0; n < T.length; n++) {
        
        if (T[n].fromStates.length > 1){
            let t = T[n].fromStates;
            t.forEach((state) => {
                let transition = {} as Trans;
                transition.from = state.stateName;
                transition.to= T[n].toState.stateName;
                transition.name = T[n].trigger;
                transitions.push(transition);
            });
        }
        else{
            let transition = {} as Trans;
            transition.from = T[n].fromStates[0].stateName;
            transition.to= T[n].toState.stateName;
            transition.name = T[n].trigger;
            transitions.push(transition);
        }
        
    }
    
    return transitions;
  }
  
function dotify(dotcfg: config) {
  
    let name        = dotcfg.name || "statemachine",
        states      = dotcfg.states || [],
        transitions = dotcfg.transitions || [],
        rankdir     = dotcfg.rankdir,
        output      = [],
        n, max;
  
    output.push("digraph " + quote(name) + " {")
    if (rankdir)
      output.push("  rankdir=" + rankdir + ";")
    for(n = 0, max = states.length ; n < max ; n++)
      output.push(dotify.state(states[n]))
    for(n = 0, max = transitions.length ; n < max ; n++)
      output.push(dotify.edge(transitions[n]))
    output.push("}")
    return output.join("\n")
  
  }

// function pad(name: string) {
//     return " " + name + " ";
// }

function quote(name: string) {
    return "\"" + name + "\"";
}

dotify.state = function(state: string) {
    return "  " + quote(state) + ";";
  }
  
dotify.edge = function(edge: Trans) {
    return "  " + quote(edge.from) + " -> " + quote(edge.to) + dotify.label(edge.name) + ";";
}

dotify.label = function(name: string) {
    return " [ label=" + quote(name) + " ]";
}

// export async function stateMachineSvgGraph(dot: string, smname: string) {
//     const svg = await renderDot({
//         input: dot,
//     });
//     writeFileSync(smname + ".svg", svg);
//     return;
// }