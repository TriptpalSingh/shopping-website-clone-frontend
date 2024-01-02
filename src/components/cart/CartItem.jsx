import React from 'react'

import './cartitem.css';

function CartItem(props) {
  return (
    <>
        <div className='item--outer'>
            <div className='item--img'>
                <img src={props.url} className='item--img-image'></img>
            </div>
            <div className='item--name'>{props.name}</div>
            <div className='item--desc'>{props.desc}</div>
            <div className='item--quantity'>Quantity: {props.quantity}</div>
            <div className='item--price'>Price:- {props.quantity}*{props.price}: {props.quantity * props.price}</div>
        </div>
    </>
  )
}

export default CartItem