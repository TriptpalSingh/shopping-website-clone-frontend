import React, { useContext, useEffect, useState } from 'react'

import './cart.css'
import Navbar from '../navbar/Navbar'
import axios from 'axios';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import CartContextImport from '../../context/cart/cartContext';
import Loader from '../loader/Loader';

function Cart() {

    const [list, setList] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [toggleLoader, setToggleLoader] = useState(false);
    const [toggleClearCartLoader, setToggleClearCartLoader] = useState(false);

    const userInfo = localStorage.getItem("user");
    const data = JSON.parse(userInfo);
    const token = data.token;
    const navigate = useNavigate();
    const cartContext = useContext(CartContextImport);

    // const authAxios = axios.create({
    //     baseURL: 'http://localhost:5000',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     }
    // })

    useEffect(()=>{
        if(userInfo == null){
            navigate('/login')
        }
        setToggleLoader(true);
        let totalPrice = 0;
        axios.post("http://localhost:5000/getCartItems", {}, { headers : {Authorization : `Bearer ${token}`}}).then((res)=>{
            setList(res.data);
            res.data.map((item)=>{
                // console.log(item.quantity + " " + item.price)
                totalPrice += item.quantity*item.price;
            })
            setSubTotal(totalPrice);
            setToggleLoader(false);
        })

        
        
        
    },[])

    const handleClearCart = (e)=>{
        setToggleClearCartLoader(true);
        // e.preventdefault();
        axios.post("https://shopping-website-clone-backend.vercel.app/clearCart",{}, {"headers": {Authorization : `Bearer ${token}`}}).then((res)=>{
            data.cart = 0;
            cartContext.setCart(data.cart);
            localStorage.setItem("user", JSON.stringify(data));
            setList([]);
            setToggleClearCartLoader(false);
        })
    }


  return (
    <>
        <Navbar/>
        {
            toggleLoader ? <Loader color={"#1c437e"}/> : null
        }
        <div className='cartItem--outer'>
            {
                list.map((item)=> <CartItem key={item.key} id={item.key} name={item.name} desc={item.desc} url={item.url} quantity={item.quantity} price={item.price}/>)
            }
        </div>
        {
            cartContext.cart != 0 && toggleLoader == false ? (
                <div className='cart--subTotal'>
                    <div className='cart--subTotal-inner'>Final-Price: ₹{subTotal}</div>
                </div>
            ):
            null
        }
        
        <div className='clearcartbtn'><button className='btn' onClick={handleClearCart}>{toggleClearCartLoader ? <Loader color={"#63e2fd"}/> : "CLEAR CART"}</button></div>
    </>
  )
}

export default Cart