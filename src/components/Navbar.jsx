import React from 'react'
import { signOut} from 'firebase/auth'
import { Link,useNavigate } from 'react-router-dom'
import {auth} from '../config/firebase/firebaseconfig'

const Navbar = () => {
    const navigate = useNavigate()

    const logoutUser = () =>{
        signOut(auth).then(()=>{
            navigate('/login')
        }).catch((error)=>{
            Error
        });
        
    }
  return (
    <div style={{
        display:'flex',
        justifyContent: 'center',
        gap: '10px',
        margin: '10px'
    }}>
        <h2><Link to={'/'}>Home</Link></h2>
        <h2><Link to = {'login'}>Login</Link></h2>
        <h2><Link to = {'register'}>Register</Link></h2>
        <h2>< Link to= {'about/'}>About</Link></h2>
        <h2 onClick={logoutUser}>Logout</h2>
    </div>
  )
}

export default Navbar