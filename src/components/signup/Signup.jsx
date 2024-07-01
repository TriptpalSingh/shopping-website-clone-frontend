import React , {useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



import './signup.css';


function Signup() {
  const navigate = useNavigate();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const emailRef = useRef();

  const emailRegEx = /^([a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{2,})$/
  const usernameRegEx = /[a-zA-Z0-9]/
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const handleSignup = (e)=>{
      const firstName = fNameRef.current.value;
      const lastName = lNameRef.current.value;
      const user = userRef.current.value;
      const email = emailRef.current.value;
      const pass = passRef.current.value;
      
      if(firstName === "" || lastName === "" || user === "" || email === "" || pass === ""){
          alert("please dont leave any field empty");
          return;
      }
      if(!emailRegEx.test(email) || !passwordRegEx.test(pass) || !usernameRegEx.test(user)){
          if(!usernameRegEx.test(user)){
            alert("the username can only contain characters, numbers, ., _, %, -");
          }
          if(!passwordRegEx.test(pass)){
            alert("the password should atleast be 8 characters long, with at least one alphabet and atleast one number");
          }
          if(!emailRegEx.test(email)){
            alert("the email address is invalid.");
          }
      }
      else{
          axios.post("https://shopping-website-clone-backend.vercel.app/auth/signup", {firstName, lastName, username:user, email, password:pass}).then((res)=>{
            if(res.data.status === "error"){
                alert(res.data.message);
            }
            else{
                navigate('/login')
            }
          })  
        // console.log(firstName, lastName, user, email, pass)

      }


  }

return (
  <>
      <div className='signup-outermost'>
          <div className='signup-outer'>
              <div className='signup-heading'>Sign Up!</div>
              <div className='signup-form-div'>
                  <fieldset className='signup-fieldset'>
                      <legend align="center" className='signup-input-legend'>First-Name</legend>
                      <input type='text' ref={fNameRef} placeholder='Enter First Name'></input>
                  </fieldset>
                  <fieldset className='signup-fieldset'>
                      <legend align="center" className='signup-input-legend'>Last-Name</legend>
                      <input type='text' ref={lNameRef} placeholder='Enter Last Name'></input>
                  </fieldset>
                  <fieldset className='signup-fieldset'>
                      <legend align="center" className='signup-input-legend'>User-Name</legend>
                      <input type='text' ref={userRef} placeholder='Enter Username'></input>
                  </fieldset>
                  <fieldset className='signup-fieldset'>
                      <legend align="center" className='signup-input-legend'>Email-Address</legend>
                      <input type='email' ref={emailRef} placeholder='Enter Email Address'></input>
                  </fieldset>
                  <fieldset className='signup-fieldset'>
                      <legend align="center" className='signup-input-legend'>Password</legend>
                      <input type='password' ref={passRef} placeholder='Enter Password'></input>
                  </fieldset>
              </div>
              <div className='signup-signup-div'>
                  <div className='signup-signup-ques'>Already have an account? <Link to={"/login"}><span className='signup-signup-span'>Log in</span></Link></div>
              </div>
              <div className='signup-submit-btn-div'>
                  <div className='signup-submit-btn' onClick={handleSignup}>Sign Up</div>
              </div>
          </div>
      </div>
  </>
)
}

export default Signup