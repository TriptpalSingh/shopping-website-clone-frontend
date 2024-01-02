import React from 'react'

import './predictions.css'

function Predictions(props) {

    const list = props.list;
  return (
    <div className='predictions--outer'>
        {
            list.map((item)=> <div className='predictions-item'>{item.title}</div>)
        }
    </div>
  )
}

export default Predictions