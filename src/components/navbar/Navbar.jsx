import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useRouteError } from "react-router-dom";
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
  const navProfileRef = useRef();
  const navDropdownRef = useRef();
  const [dropdownStyle, setDropdownStyle] = useState({
    display: "none"
  })
  const [toggleProfileIcon, setToggleProfileIcon] = useState(false) //if its false, it will be empty, if true, it will be filled.


  const handleMouseDown = (e) => {
    if (navDropdownRef.current != null && navProfileRef.current != null && (navDropdownRef.current.contains(e.target) || navProfileRef.current.contains(e.target))) {
      setDropdownStyle({
        display: "block"
      })
    }
    else {
      setDropdownStyle({
        display: "none"
      })
    }
  }


  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown, true);

  }, []);



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

  const handleCart = (e) => {
    e.preventDefault();
    navigate('/cart');
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    console.log("logged out");
    navigate("/");
  }

  //const handleAddItem = (e) => {
  //e.preventDefault();
  //navigate('/addItem')
  //}

  const handleclick = (e) => {
    e.preventDefault();
    navigate('/')
  }

  const handleProfileMouseOver = (e) => {
    e.preventDefault();
    setToggleProfileIcon(true);
  }

  const handleProfileMouseOut = (e) => {
    e.preventDefault();
    setToggleProfileIcon(false);
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
                  <NavLink style={{ textDecoration: 'none' }}>
                    <button ref={navProfileRef} className='nav-dropdown-btn' onMouseOver={handleProfileMouseOver} onMouseOut={handleProfileMouseOut} >
                      {
                        toggleProfileIcon ? <img src='/assets/user.png' /> : <img src='/assets/user(1).png' />
                      }

                    </button>
                  </NavLink>
                  <div ref={navDropdownRef} className='navbar--dropdown fade-in' style={dropdownStyle} >
                    <button className='navbar--dropdown-cart' onClick={handleCart}>cart</button>
                    <button className='navbar--dropdown-logout' onClick={handleLogout}>logout</button>

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














