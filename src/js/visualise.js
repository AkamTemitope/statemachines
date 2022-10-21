"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateMachineSvgGraph = exports.visualise = void 0;
const fs_1 = require("fs");
const render_dot_1 = require("render-dot");
function visualise(sm, name, orientation) {
    return dotify(dotcfg(sm, name, orientation));
}
exports.visualise = visualise;
function dotcfg(sm, name, orientation) {
    let rankdir = dotcfg.rankdir(orientation);
    let states = dotcfg.states(sm);
    let transitions = dotcfg.transitions(sm);
    let result = {};
    if (name)
        result.name = name;
    if (rankdir)
        result.rankdir = rankdir;
    if (states && states.length > 0)
        result.states = states;
    if (transitions && transitions.length > 0)
        result.transitions = transitions;
    return result;
}
dotcfg.rankdir = function (orientation) {
    if (orientation === 'horizontal')
        return 'LR';
    else if (orientation === 'vertical')
        return 'TB';
};
dotcfg.states = function (sm) {
    let states = sm.getStates();
    return states.map((state) => state.stateName);
};
dotcfg.transitions = function (sm) {
    let transitions = [];
    let T = sm.getTransitions();
    for (let n = 0; n < T.length; n++) {
        if (T[n].fromStates.length > 1) {
            let t = T[n].fromStates;
            t.forEach((state) => {
                let transition = {};
                transition.from = state.stateName;
                transition.to = T[n].toState.stateName;
                transition.name = T[n].trigger;
                transitions.push(transition);
            });
        }
        else {
            let transition = {};
            transition.from = T[n].fromStates[0].stateName;
            transition.to = T[n].toState.stateName;
            transition.name = T[n].trigger;
            transitions.push(transition);
        }
    }
    return transitions;
};
function dotify(dotcfg) {
    let name = dotcfg.name || "statemachine", states = dotcfg.states || [], transitions = dotcfg.transitions || [], rankdir = dotcfg.rankdir, output = [], n, max;
    output.push("digraph " + quote(name) + " {");
    if (rankdir)
        output.push("  rankdir=" + rankdir + ";");
    for (n = 0, max = states.length; n < max; n++)
        output.push(dotify.state(states[n]));
    for (n = 0, max = transitions.length; n < max; n++)
        output.push(dotify.edge(transitions[n]));
    output.push("}");
    return output.join("\n");
}
function pad(name) {
    return " " + name + " ";
}
function quote(name) {
    return "\"" + name + "\"";
}
dotify.state = function (state) {
    return "  " + quote(state) + ";";
};
dotify.edge = function (edge) {
    return "  " + quote(edge.from) + " -> " + quote(edge.to) + dotify.label(edge.name) + ";";
};
dotify.label = function (name) {
    return " [ label=" + quote(name) + " ]";
};
function stateMachineSvgGraph(dot, smname) {
    return __awaiter(this, void 0, void 0, function* () {
        const svg = yield (0, render_dot_1.renderDot)({
            input: dot,
        });
        (0, fs_1.writeFileSync)(smname + ".svg", svg);
        return;
    });
}
exports.stateMachineSvgGraph = stateMachineSvgGraph;
