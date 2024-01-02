import React, { useState, useRef } from 'react'
import axios from 'axios';

import './iteminfo.css'

function ItemInfo() {

    const itemName = useRef();
    const itemDesc = useRef();
    const itemUrl = useRef();
    

    const handleSubmit = (e)=>{
        e.preventDefault();

        const name = itemName.current.value;
        const desc = itemDesc.current.value;
        const url = itemUrl.current.value;

        if(name === "" || desc === "" || url === ""){
            alert("no field can be empty.");
            return;
        }

        axios.post("https://shopping-website-clone-backend.vercel.app/addItem", {name, desc, url}).then((res)=>{
            alert(res.data);
        })


    }


  return (
    <>
        <div className='item-info--outer'>
            <div className='item-info--inner'>
                <div className='heading'>ADD ITEM</div>
                <label typeof='itemName'>
                    <input ref={itemName} className='inp' name="itemName" type='text' placeholder='add item name.'></input>
                </label>
                <label typeof='itemDesc'>
                    <input ref={itemDesc} className='inp' name="itemDesc" type='text' placeholder='add item Description.'></input>
                </label>
                <label typeof='itemName'>
                <input ref={itemUrl} className='inp' name="itemImg" type='text' placeholder='add item Image url.'></input>
                </label>
                <button className='btn' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </>
  )
}

export default ItemInfo