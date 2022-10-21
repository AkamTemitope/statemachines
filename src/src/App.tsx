import React, { ChangeEvent, useState } from 'react';
import './App.css';
import GraphContainer from './components/GraphContainer';
import LeftContainer from './components/LeftContainer';
import RightContainer from './components/RightContainer';
import { State, Transition, StateMachine } from './lib/classes';
import { visualise } from './lib/visualise';
// import { writeFileSync } from 'fs';
// import { renderDot } from 'render-dot'

function App() {

  const [name, setName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [trigger, setTrigger] = useState<string>("")
  const [fromStateName, setFromStateName] = useState<string>("");
  const [toStateName, setToStateName] = useState<string>("");
  const [stateMachine, setStateMachine] = useState<StateMachine>(new StateMachine());
  const [dot, setDot] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "state") {
      setStateName(event.target.value)
    } 
    else if(event.target.name === "transition") {
      setTrigger(event.target.value);
    }
    else {
      setName(event.target.value)
    } 
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    if(event.target.name === "fromStateName"){
      setFromStateName(event.target.value)
    }
    else {
      setToStateName(event.target.value)
    }
  }

  const addState = (): void => {
    let exist = stateMachine.getStates().find((state) => state.stateName === stateName);
    if(stateName !== "" && !exist){
      let state = new State(stateName);
      stateMachine.addState(state);
      setStateName("");
    }
  }

  const addTransition = (): void => {
    let exist = stateMachine.getTransitions().find((trans)=> trans.fromStates[0].stateName === fromStateName && trans.toState.stateName === toStateName);
    if(trigger !== "" && !exist && fromStateName !== "" && toStateName !== ""){
      let fromState = new State(fromStateName);
      let toState = new State(toStateName);
      let transition = new Transition(trigger, [fromState], toState);
      stateMachine.addTransition(transition);
      setTrigger("");
    }
  }

  const createDot = async () => {
    if(stateMachine.getStates().length > 1 && stateMachine.getTransitions().length > 1){
      const dot = await visualise(stateMachine, name, "horizontal");
      setDot(dot);
    }
  }

  const reset = () => {
    setStateMachine(new StateMachine());
    setDot("");
    setName("");
  }

  // const  saveSVG = async (dot: string, smname: string) => {
  //       const svg = await renderDot({
  //           input: dot,
  //       });
  //       writeFileSync(smname + ".svg", svg);
  //       return;
  //   }

  return (
    <div className="App">
      <div className='container'>
        {dot? <GraphContainer dot={dot} name={name} /> : 
        <LeftContainer states={stateMachine.getStates()} handleChange={handleChange} handleSelectChange={handleSelectChange}
          addState={addState} addTransition={addTransition} createDot={createDot} 
          fromState={fromStateName} toState={toStateName} stateName={stateName} trigger={trigger} name={name}/>}
        <RightContainer stateMachine={stateMachine}/>
      </div>
      <button className='reset' onClick={reset}>RESET</button>
    </div>
  );
}

export default App;
