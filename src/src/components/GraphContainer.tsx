import Graphviz from 'graphviz-react'
import React, { FC } from 'react'

type Props = {
  dot: string
  options?: object,
  className?: string,
  name?: string,
  // save?: (dot: string, name: string) => void
}



const GraphContainer: FC<Props> = ({ dot, name}) => {
  return (
    <div className='graph'>
        {name? <h2>{name}</h2> : <h2>State Machine</h2>}
        <Graphviz dot={dot}/>
        {/* <button onClick={save}>Save SVG</button> */}
    </div>
  )
}

export default GraphContainer