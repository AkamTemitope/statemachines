import React, { FC } from 'react'
import '../App.css'
import { StateMachine } from '../lib/classes';

type Props = {
    stateMachine: StateMachine
}

const RightContainer: FC<Props> = ({ stateMachine }) => {
  return (
    <div className='rightContainer'>
        <h2>STATES</h2>
        <div className="states">
            {stateMachine.getStates().map((state, key) =>
                <li key={key}>{state.stateName}</li>
            )}
        </div>
        <h2>TRANSITIONS</h2>
        <div className="transitions">
            {stateMachine.getTransitions().map((trans, key) => {
                return  <div className='transition' key={key}>
                            <h3>{trans.trigger}: </h3>
                            <p>From <span>{trans.fromStates[0].stateName}</span></p>
                            <p>To <span>{trans.toState.stateName}</span></p>
                        </div>
            })}
        </div>
    </div>
  )
}

export default RightContainer