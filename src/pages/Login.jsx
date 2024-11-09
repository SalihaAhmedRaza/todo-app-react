import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [error,setError]= useState(false)
  const email = useRef()
  const password = useRef()

  const navigate = useNavigate()
  const loginUser = (event )=>{
    event.preventDefault()
    console.log(email.current.value)
    console.log(password.current.value);

    signInWithEmailAndPassword(auth,email.current.value,password.current.value)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log(user);
      navigate('/')
    })
    .catch((error)=>{
      const errorMeesage = error.message;(errorMeesage);

      console.log(errorMeesage);
      setError(errorMeesage)
    });
  }
  return (
    <>  
    <h1>Login</h1>
    <form onSubmit={loginUser}>
      <input type='email' placeholder='enter your email' ref={email}/>
      <input type='password'placeholder='enter your password'ref={password}/>
      <button>Login</button>

    </form>
    <p>{error && error}</p>
    </>
  )
}

export default Login