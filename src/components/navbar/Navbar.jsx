import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import CartContextImport from '../../context/cart/cartContext';
import axios from 'axios';

import './navbar.css'
import Search from '../search/Search';


const FullWidthOptions = (props) => {

  const cartContext = useContext(CartContextImport);

  // const [name, setName] = useState("");
  // const [cart, setCart] = useState(null);

  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#63e2fd" : "#ffffff",
      textDecoration: "none",
    };
  }

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo != null) {
      const data = JSON.parse(userInfo);
      // setName(data.name)
      cartContext.setCart(data.cart);
    }
    else {
      // setName("signup or login.")
    }
  }, [localStorage.getItem("user")])

  return (
    <>
      <Search list={props.list} setNewList={props.setNewList} />
      {/* <NavLink style={navActive}>
        <div className='nav-link'>{name}</div>
      </NavLink>

      {name=="admin" || name == "signup or login." ? (
        null
      ) : (
        <NavLink style={navActive} to={'/cart'}>
        <div className='nav-link'>Cart ({cartContext.cart})</div>
      </NavLink>
      )} */}



    </>
  )
}

function Navbar(props) {

  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [name, setName] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo != null) {
      const data = JSON.parse(userInfo);
      if (userInfo != null) {
        const data = JSON.parse(userInfo);
        setName(data.name)
      }
      else {
        setName("login or signup")
      }
    }
  })


  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#63e2fd" : "#ffffff",
      textDecoration: "none",
    };
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    console.log("logged out");
    navigate("/login");
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    navigate('/addItem')
  }

  const handleclick = (e) => {
    e.preventDefault();
    navigate('/')
  }



  return (
    <>
      <div className='nav-outer'>
        <div className='nav-logo' onClick={handleclick}></div>

        <FullWidthOptions list={props.list} setNewList={props.setNewList} />


        <div className='nav-register'>
          {
            localStorage.getItem("user") != null ?
              (
                <NavLink  style={{ textDecoration: 'none' }}>
                  <div className='logout-btn' onClick={handleLogout}>LOGOUT</div>
                </NavLink>
              ) :
              (
                <>
                  <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
                    <div className='login-btn'>LOGIN</div>
                  </NavLink>
                  <NavLink to={"/signup"} style={{ textDecoration: 'none' }}>
                    <div className='signup-btn'>SIGN UP</div>
                  </NavLink>
                </>
              )
          }

        </div>
      </div>
    </>
  )
}

export default Navbar