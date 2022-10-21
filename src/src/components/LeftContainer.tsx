import React, { ChangeEvent, FC }from 'react'
import '../App.css'
import { State } from '../lib/classes'

type Props = {
    states: State[],
    handleChange(event: ChangeEvent<HTMLInputElement>): void,
    handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void,
    createDot: () => void,
    addState: () => void,
    addTransition: () => void,
    fromState: string,
    toState: string,
    stateName: string
    trigger: string
    name: string
}

const LeftContainer: FC<Props> = ({ states, handleChange, handleSelectChange, addState, addTransition, createDot, fromState, toState, stateName, trigger, name }) => {
  return (
    <div className='leftContainer'>
        <h2>State machine name</h2>
        <div className="addState">
            <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <h2>Add State</h2>
        <div className="addState">
            <input type="text" name="state" value={stateName} onChange={handleChange} />
            <button onClick={addState}>Add</button>
        </div>
        <h2>Add Transition</h2>
        <div className="addTransition">
            <input type="text" name="transition" value={trigger} onChange={handleChange}/>
            <select name="fromStateName" onChange={handleSelectChange}  >
                <option value="">From</option>
                {states.map((state, key) =>
                    <option key={key} value={state.stateName}>{state.stateName}</option>
                )}
            </select>
            <select name="toStateName"onChange={handleSelectChange} >
                <option value="">To</option>
                {states.reverse().map((state, key) =>
                    <option key={key} value={state.stateName}>{state.stateName}</option>
                )}
            </select>
            <button onClick={addTransition}>Add</button>
        </div>
        {/* {name && <h2>{name.toLocaleUpperCase()}</h2>} */}
        <button className='viz' onClick={createDot}>Visualise</button>
    </div>
  )
}

export default LeftContainer