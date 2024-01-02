import React, {useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar'
import axios from 'axios';
import Product from '../product/Product';

import './home.css';
import { useNavigate } from 'react-router-dom';
import Search from '../search/Search';

function Home() {

    const [list, setList] = useState([]);
    const [newList, setNewList] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{

        const userInfo = localStorage.getItem("user");
        if(userInfo == null){
            navigate('/login');
            return;
        }

        axios.get("https://dummyjson.com/products").then((res)=>{
            // console.log(res.data.products[0]);
            setList(res.data.products);
            setNewList(res.data.products);
        })

        // console.log();
    }, [])
    
  return (
    <>
        <Navbar/>
        <Search list={list} setNewList={setNewList}/>
        <div className='products'>
            {
                newList.map((product)=> <Product key={product.id} id={product.id} name={product.title} desc={product.description} url={product.thumbnail} price={product.price}/>)
            }
        </div>
    </>
  )
}

export default Home