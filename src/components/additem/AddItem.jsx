import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import ItemInfo from './ItemInfo'
import { useNavigate } from 'react-router-dom'

function AddItem() {

  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo = localStorage.getItem("user");
    if(userInfo == null){
      navigate('/login');
    }
})

  return (
    <>
        <Navbar/>
        <ItemInfo/>
    </>
  )
}

export default AddItem