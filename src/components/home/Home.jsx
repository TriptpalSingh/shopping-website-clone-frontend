import React, {useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar'
import axios from 'axios';
import Product from '../product/Product';
import Loader from '../loader/Loader';

import './home.css';
import { useNavigate } from 'react-router-dom';
import Search from '../search/Search';

function Home() {

    const [list, setList] = useState([]);
    const [newList, setNewList] = useState([]);
    const navigate = useNavigate();
    const [toggleLoader, setToggleLoader] = useState(false);


    useEffect(()=>{

        const userInfo = localStorage.getItem("user");
        // if(userInfo == null){
        //     navigate('/login');
        //     return;
        // }
        setToggleLoader(true);

        axios.get("https://dummyjson.com/products").then((res)=>{
            // console.log(res.data.products[0]);
            setList(res.data.products);
            setNewList(res.data.products);
            setToggleLoader(false);
        })

        // console.log();
    }, [])
    
  return (
    <>
        <Navbar list={list} setNewList={setNewList}/>
        {/* <Search list={list} setNewList={setNewList}/> */}
        {
            toggleLoader ? <Loader color={"#1c437e"}/> : null
        }
        <div className='products'>
            {
                newList.map((product)=> <Product key={product.id} id={product.id} name={product.title} desc={product.description} url={product.thumbnail} price={product.price}/>)
            }
        </div>
    </>
  )
}

export default Home