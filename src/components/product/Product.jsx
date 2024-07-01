import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import CartContextImport from '../../context/cart/cartContext'

import './product.css'
import { useNavigate } from 'react-router-dom'

import Loader from '../loader/Loader'

function Product(props) {

    // useEffect(()=>{
    //     console.log(props.id)
    // })

    const navigate = useNavigate();
    const cartContext = useContext(CartContextImport);
    const [toggleLoader, setToggleLoader] = useState(false);

    const key = props.id;
    const name = props.name;
    const desc = props.desc;
    const url = props.url;
    const price = props.price;

    const handleCart = (e)=>{
        const user = localStorage.getItem('user');
        if(!user){
            navigate('/login');
            return;
        }
        setToggleLoader(true);
        e.preventDefault();
        const userInfo = localStorage.getItem("user");
        const data = JSON.parse(userInfo);
        const token = data.token;
        axios.post("https://shopping-website-clone-backend.vercel.app/addToCart", {key, name, desc, url, price}, {"headers": {Authorization : `Bearer ${token}`}}).then((res)=>{
            // console.log(data.cart)
            if(res.data.change === "new item added"){
                // console.log("here");
                data.cart += 1;
                cartContext.setCart(data.cart);
            }
            localStorage.setItem("user", JSON.stringify(data));
            setToggleLoader(false);
        })

    }

  return (
    <>
        <div className='product--outer'>
            <div className='product--img'>
                <img src={props.url} alt='img' className='product--img-image'></img>
            </div>
            <div className='product--info'>
                <div className='product--title'>{props.name}</div>
                <div className='product--desc'>{props.desc}</div>
            </div>
            <div className='product--bottom-div'>
                <div className='product--price-div'>
                    <span className='product--price-span'>Price: ₹ {props.price}</span>
                </div>
                <div className='product--cart-btn'><button className='btn' onClick={handleCart}>{toggleLoader ? <Loader color={"#63e2fd"}/> : "ADD TO CART"}</button></div>
            </div>
        </div>
    </>
  )
}

export default Product