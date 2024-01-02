
import React, {useRef, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import loginContextImport from '../../context/login/loginContext'
import './login.css'
import axios from 'axios';

function Login() {
    const userRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();
    // const loginContext = useContext(loginContextImport);

    const handleLogin = (e)=>{
        const username = userRef.current.value;
        const password = passRef.current.value;

        if(username === "" || password === ""){
            alert("Please don't leave any field empty.")
            return;
        }

        axios.post("https://shopping-website-clone-backend.vercel.app/login", {username, password}).then((res)=>{
            if(res.data.status == "ok"){
                const userInfo = {
                    cart:res.data.cart,
                    name:res.data.name,
                    username,
                    token: res.data.token
                }
                localStorage.setItem('user', JSON.stringify(userInfo));
                navigate('/home')
            }
            else{
                alert(res.data.message);
            }
        }).catch((e)=>{
            console.log(e.message);
        })
    }


  return (
    <>
        <div className='login-outermost'>
            <div className='login-outer'>
                <div className='login-heading'>Log in!</div>
                <div className='login-form-div'>
                    <fieldset className='login-fieldset'>
                        <legend align="center" className='login-input-legend'>Username</legend>
                        <input type='text' ref={userRef} placeholder='Enter Username'></input>
                    </fieldset>
                    <fieldset className='login-fieldset'>
                        <legend align="center" className='login-input-legend'>Password</legend>
                        <input type='password' ref={passRef} placeholder='Enter Password'></input>
                    </fieldset>
                </div>
                <div className='login-submit-btn-div'>
                    <div className='login-submit-btn' onClick={handleLogin}>Log in</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login