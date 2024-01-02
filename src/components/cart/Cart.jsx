import React, { useContext, useEffect, useState } from 'react'

import './cart.css'
import Navbar from '../navbar/Navbar'
import axios from 'axios';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import CartContextImport from '../../context/cart/cartContext';

function Cart() {

    const [list, setList] = useState([]);
    const [subTotal, setSubTotal] = useState(0);

    const userInfo = localStorage.getItem("user");
    const data = JSON.parse(userInfo);
    const token = data.token;
    const navigate = useNavigate();
    const cartContext = useContext(CartContextImport);

    useEffect(()=>{
        if(userInfo == null){
            navigate('/login')
        }
        let totalPrice = 0;
        axios.post("https://shopping-website-clone-backend.vercel.app/getCartItems", {token}).then((res)=>{
            setList(res.data);
            res.data.map((item)=>{
                // console.log(item.quantity + " " + item.price)
                totalPrice += item.quantity*item.price;
            })
            setSubTotal(totalPrice);
        })

        
        
        
    },[])

    const handleClearCart = (e)=>{
        // e.preventdefault();
        axios.post("https://shopping-website-clone-backend.vercel.app/clearCart", {token}).then((res)=>{
            data.cart = 0;
            cartContext.setCart(data.cart);
            localStorage.setItem("user", JSON.stringify(data));
            setList([]);
        })
    }


  return (
    <>
        <Navbar/>
        <div className='cartItem--outer'>
            {
                list.map((item)=> <CartItem key={item.key} id={item.key} name={item.name} desc={item.desc} url={item.url} quantity={item.quantity} price={item.price}/>)
            }
        </div>
        {
            cartContext.cart != 0 ? (
                <div className='cart--subTotal'>
                    <div className='cart--subTotal-inner'>Final-Price: ₹{subTotal}</div>
                </div>
            ):
            null
        }
        
        <div className='clearcartbtn'><button className='btn' onClick={handleClearCart}>CLEAR CART</button></div>
    </>
  )
}

export default Cart