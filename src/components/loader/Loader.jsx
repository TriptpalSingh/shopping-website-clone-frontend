import React from 'react'

import './loader.css'

function Loader(props) {

    const color = props.color;

    const loaderColor = {
        background: color
    }

  return (
    <div className='loader--outer'>
        <div class="lds-ellipsis"><div style={loaderColor}></div><div style={loaderColor}></div><div style={loaderColor}></div><div style={loaderColor}></div></div>
    </div>
  )
}

export default Loader