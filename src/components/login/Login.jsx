
import React, {useRef, useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import loginContextImport from '../../context/login/loginContext'
import './login.css'
import axios from 'axios';
import Loader from '../loader/Loader';

function Login() {
    const userRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();
    const [toggleLoader, setToggleLoader] = useState(false);
    // const loginContext = useContext(loginContextImport);

    const handleLogin = (e)=>{
        setToggleLoader(true);
        const username = userRef.current.value;
        const password = passRef.current.value;

        if(username === "" || password === ""){
            alert("Please don't leave any field empty.")
            return;
        }

        axios.post("https://shopping-website-clone-backend.vercel.app/auth/login", {username, password}).then((res)=>{
            if(res.data.status == "ok"){
                const userInfo = {
                    cart:res.data.cart,
                    name:res.data.name,
                    token: res.data.token
                }
                localStorage.setItem('user', JSON.stringify(userInfo));
                navigate('/home')
            }
            else{
                alert(res.data.message);
            }
            setToggleLoader(false);
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
                <div className='login-signup-div'>
                    <div className='login-signup-ques'>Don't have an account? <Link to={"/signup"}><span className='login-signup-span'>Sign up</span></Link></div>
                </div>
                <div className='login-submit-btn-div'>
                    <div className='login-submit-btn' onClick={handleLogin}>Log in</div>
                </div>
                {
                    toggleLoader ? <Loader color={"white"}/> : null
                }
                {/* <Loader color={"white"}/> */}
            </div>
        </div>
    </>
  )
}

export default Login