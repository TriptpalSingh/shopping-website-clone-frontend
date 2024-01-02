import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import CartContextImport from '../../context/cart/cartContext'

import './product.css'
import { useNavigate } from 'react-router-dom'

function Product(props) {

    // useEffect(()=>{
    //     console.log(props.id)
    // })

    const navigate = useNavigate();
    const cartContext = useContext(CartContextImport);

    const key = props.id;
    const name = props.name;
    const desc = props.desc;
    const url = props.url;
    const price = props.price;

    const handleCart = (e)=>{
        e.preventDefault();
        const userInfo = localStorage.getItem("user");
        const data = JSON.parse(userInfo);
        const token = data.token;
        axios.post("https://shopping-website-clone-backend.vercel.app/addToCart", {key, name, desc, url, price, token}).then((res)=>{
            // console.log(data.cart)
            if(!res.data.quantityChange){
                // console.log("here");
                data.cart += 1;
                cartContext.setCart(data.cart);
            }
            localStorage.setItem("user", JSON.stringify(data));
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
                <div className='product--cart-btn'><button className='btn' onClick={handleCart}>ADD TO CART</button></div>
            </div>
        </div>
    </>
  )
}

export default Product