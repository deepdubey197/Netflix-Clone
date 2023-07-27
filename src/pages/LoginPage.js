import React, {useState} from 'react'
import Header from '../components/Header'
import BackgroundImage from '../components/BackgroundImage'
import styled from 'styled-components'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import {firebaseAuth} from '../utils/firebase-config'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate = useNavigate();

  const handleSignIn = ()=>{
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log('User signed in:', userCredential.user);
      // ...
      navigate('/');
    })
    .catch((error) => {
      console.error('Error signing in:', error.message);
    });
  }

  const handleAdminLogin = ()=>{
    navigate('/admin')
  }

  /*onAuthStateChanged(firebaseAuth, (currentuser)=>{
    if(currentuser) navigator('/')
  });*/
  return (
    <Wrapper>
    <BackgroundImage/>
    <div className='loginContent'>
      <Header/>
      <div className='form-wrapper'>
        <div className="form">
          <div className='title'>
            <h1>Login</h1>
          </div>
          <div className='container'>
            <input  type='text' placeholder='Email Addres'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
            <input type='password' placeholder='Password'
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
            <button onClick={handleSignIn}>Login</button>
            <button className="admin-login-button" onClick={handleAdminLogin}>Admin Login</button>
          </div>
       </div>

      </div>
      
    </div>

    </Wrapper>
  )
}

const Wrapper = styled.div`
position: relative;

button.admin-login-button {
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 0.4rem;
  
  color: white;
  font-weight: 100;
  font-family: 'Noto Sans', sans-serif;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Align to the right */
  margin-left: auto;
}

.loginContent{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0,0.60);
  height: 100vh;
  width: 100vw;
  grid-template-columns: 15vh 85vh;
  .form-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height:85vh; 
  }
  .form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: rgba(0,0,0,0.84);
    height: 70vh;
    padding: 2rem;
    color: white;
    border-radius: 0.4rem;

    .container{
      display: flex;
      flex-direction: column;
      gap:2rem;
      input{
        border-radius: 0.4rem;
        padding: 0.5rem 1rem;
        width: 25rem;
        height: 2.4rem;
        outline: none;
      }
      button{
        padding:0.5rem;
        background-color: red;
        border: none;
        cursor: pointer;
        border-radius: 0.4rem;
        height: 3.4rem;
        color: white;
        font-weight: 800;
        font-size: 1.05rem;
        font-family: 'Noto Sans', sans-serif;

        &:hover{
            background-color: #c11119;
        }
      }
    }
  }
}
`



export default LoginPage
