import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import CartContextImport from '../../context/cart/cartContext';
import axios from 'axios';

import './navbar.css'
import Search from '../search/Search';


const FullWidthOptions = (props) => {

  const cartContext = useContext(CartContextImport);


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
      //setName(data.name)
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
  const logoutBtnRef= useRef();

  
//  const handleMouseDown = (e)=>{
//    if(searchRef.current != null && searchRef.current.value && searchRef.current.contains(e.target)){
//      setTogglePredictions(true);
//    }
//    else{
//      setTogglePredictions(false);
//    }
//    // console.log("down");
//  }





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

  const [dropdownStyle, setDropdownStyle] = useState({
    display: "none"
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
    navigate("/");
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    navigate('/addItem')
  }

  const handleclick = (e) => {
    e.preventDefault();
    navigate('/')
  }

  const handleMouseOver = (e) => {
    e.preventDefault();
    setDropdownStyle({
      display: "block"
    })
  }

  const handleMouseOut = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setDropdownStyle({
        display: "none"
      })

    }, 200);
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
                <>
                <NavLink  style={{ textDecoration: 'none' }}>
                  <div className='logout-btn' ref={logoutBtnRef} onClick={handleLogout} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>LOGOUT</div>
                </NavLink>
                <div className='navbar--dropdown fade-in' style={dropdownStyle}>

                </div>
                </>
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
