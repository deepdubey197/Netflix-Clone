import React, {useState} from 'react'
//import { initializeApp } from 'firebase/app';
import styled from 'styled-components'
//import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
//import { getAuth } from 'firebase/auth'
//import  firebaseAuth  from '../utils/firebase-config'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BackgroundImage from '../components/BackgroundImage'
const firebaseConfig = {
    apiKey: "AIzaSyDVwgoDQHle78HJQhqoSvEqt2L_AizhyJk",
    authDomain: "netflix-project-50c05.firebaseapp.com",
    projectId: "netflix-project-50c05",
    storageBucket: "netflix-project-50c05.appspot.com",
    messagingSenderId: "375777452042",
    appId: "1:375777452042:web:00f2fbbf5c9b4900957ff3",
    measurementId: "G-MMQ9RVTB50"
  };
  const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const SignUpPage = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [showPassword, setShowPassword ]=useState(false);
    const [isEmail, setIsEmail]=useState(true);
    const hadndleLabelChange=()=>{
        setIsEmail(!isEmail);
    };
    //const [formValues, setFormValues]=useState({email:"", password:""})
    const navigate = useNavigate();
    const handleSignIn =  ()=>{
        /*try{
            const{email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        }catch(error){
            console.log(error)

        }*/
        firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User creation success, you can handle it here
        console.log('User created:', userCredential.user);
      })
      .catch((error) => {
        // User creation failed, handle the error here
        console.error('Error adding user:', error.message);
      });
        navigate('/')
    };

    const ThickLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: #232323;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
  color: white;
  font-size: 1.2rem;
`;

const TextContainer = styled.div`
  flex: 1;
  margin-left: 100px;
  padding-bottom: 100px;
`;

const TextContainernew = styled.div`
  flex: 1;
  margin-left: 30px;
  padding-bottom: 100px;
`;

const TextContainerbottom = styled.div`
display: flex;
justify-content: center;
`

const ImageContainer = styled.div``;

const AnimatedImagenew = styled.img`
height: 400px;
padding-bottom:30px;
 
`;

const AnimatedImage = styled.img`
 
`;


    
    
  return (
    <Container>
        <BackgroundImage/>
        <div className='container'>
            <Header login/>
            <div className='body'>
                <div className='text'>
                    <h1>Unlimited Movies, Tv shows and more</h1>
                    <h4>Watch Anywhere, Cancel Anytime </h4>
                    <h6>Ready to watch?  Enter your Email to create or restart membership</h6>
                </div>
                <div className='form'>
                
                    
                        <input 
                        type={isEmail? 'email':'password'} 
                        placeholder={isEmail? 'Enter Email':'Enter Password'} name='password'
                        value={isEmail? email:password}
                        onChange={isEmail?(e)=>setEmail(e.target.value):(e)=>setPassword(e.target.value)}
                         />
                     
                

                
                    <button onClick={isEmail? hadndleLabelChange:handleSignIn}>
                    {isEmail? 'Get Started':'Sign Up'}
                    </button>
                    
                </div>
            </div>
        </div>

        <div>
            <ThickLine/>

        </div>

        <Divider>
        <TextContainer>
          <h1 style={{ fontSize: '3rem', color: 'white', margin: '0',paddingBottom:'20px' }}>Enjoy on your TV</h1>
          <h3 style={{ color: 'white',fontWeight:'500' }}>
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
          </h3>
        </TextContainer>
        <ImageContainer>
          <AnimatedImage
            src='https://netflix-images.manikantp.repl.co/Netflix1.gif'
            alt='Netflix Animation'
          />
        </ImageContainer>
      </Divider>

      <ThickLine/>

      <Divider>

      <ImageContainer>
          <AnimatedImage style={{marginLeft:'50px'}}
            src='https://netflix-images.manikantp.repl.co/Netflix2.gif'
            alt='Netflix Animation'
          />
        </ImageContainer>
        <TextContainernew>
          <h1 style={{ fontSize: '3rem', color: 'white', margin: '0',paddingBottom:'20px' }}>Download your<br/>shows to watch<br/>offline</h1>
          <h3 style={{ color: 'white',fontWeight:'500' }}>
          Save your favourites easily and always<br/>have something to watch.
          </h3>
        </TextContainernew>
        
      </Divider>

      <ThickLine/>

      <Divider>
        <TextContainer>
          <h1 style={{ fontSize: '3rem', color: 'white', margin: '0',paddingBottom:'20px' }}>Watch everywhere</h1>
          <h3 style={{ color: 'white',fontWeight:'500' }}>
          Stream unlimited movies and TV shows on <br/> your phone, tablet, laptop, and TV.
          </h3>
        </TextContainer>
        <ImageContainer style={{marginRight:'250px'}}>
          <AnimatedImagenew
            src='https://o.aolcdn.com/hss/storage/midas/33fd582a6cfb92832788477f49b2c1df/206192957/ezgif.com-resize.gif'
            alt='Netflix Animation'
          />
        </ImageContainer>
      </Divider>

      <ThickLine/>

      <Divider>

      <ImageContainer>
          <AnimatedImage style={{marginLeft:'50px', height:'400px'}}
            src='https://occ-0-988-784.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d'
            alt='Netflix Animation'
          />
        </ImageContainer>
        <TextContainernew>
          <h1 style={{ fontSize: '3rem', color: 'white', margin: '0',paddingBottom:'20px' }}>Create profiles for<br/>kids</h1>
          <h3 style={{ color: 'white',fontWeight:'500' }}>
          Send children on adventures with their<br/>favourite characters in a space made<br/>just for them—free with your membership.
          </h3>
        </TextContainernew>
        
      </Divider>


      <ThickLine/>

        <Divider>
        <TextContainer >
            <h5 style={{fontWeight:'400'}}>Questions?  <u>Call 000-800-919-1694</u></h5><br/><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>FAQ</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Media Centre</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Ways to Watch</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Cookie Preferences</u></ul><br/>
            <a href='https://fast.com/'><ul style={{color:'white',fontWeight:'300',fontSize:'0.83em'}}><u>Speed Test</u></ul></a>
        </TextContainer>

        <TextContainer >
            <br/><br/><br/><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Help Centre</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Investor Relations</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Terms of Use</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Corporate Information</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Legal Notices</u></ul><br/>
        </TextContainer>


        <TextContainer >
            <br/><br/><br/><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Account</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Jobs</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Privacy</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Contact Us</u></ul><br/>
            <ul style={{fontWeight:'300',fontSize:'0.83em',cursor:'pointer'}}><u>Only on Netflix</u></ul><br/>
        </TextContainer>

        
        </Divider>




           
        
        
    </Container>
  )
}

const Container = styled.div`
position: relative;
.container{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0,0.70);
    height:100vh;
    width:100vw;
    grid-template-columns: 15vh 85vh ;
    .body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    .text{
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 1.5rem;
        color:white;
        font-family: 'Noto Sans', sans-serif;;
        
    }
    h1{
        padding: 0 25rem;
    }
    h4{
        margin-top: 1rem;
    }
    h6{
        margin-top: 1rem;

    }
}

.animatedimage{
    display: flex;
}

.divider{
    width: 100%;
    height: 300px;
    
    h1{
        margin-left: 150px;
        margin-top: 150px;
    }
    h3{
        margin-left: 150px;
        padding-top: 20px;

    }
}

.form{
    display: grid;
    width: 70%;
    padding-top: 50px;
    grid-template-columns: ${({showPassword})=> showPassword ? '1fr 1fr' : '2fr 1fr'};
    input{
        color: white;
        background-color: black;
        padding: 1.5rem;
        font-size: 1.2rem;
        width: 45rem;
        border-radius: 5px;
        background: transparent;
        margin-right: 10px;
        &focus{
            outline: none;
        }
    }
    button{
        padding: 0.5rem 1rem;
        background-color: red;
        border: none;
        cursor: pointer;
        color:white;
        font-size: 1.2rem;
        width:10rem;
        font-weight: 800;
        font-family: 'Noto Sans', sans-serif;
        border-radius: 5px;
        &:hover{
            background-color: #c11119;
        }
    }

    
}
`

export default SignUpPage

