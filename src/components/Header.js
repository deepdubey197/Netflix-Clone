import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const Header = (props) => {
    const navigate=useNavigate()
  return (
    <HeaderContainer>
        <div className='logo'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' alt='no internet connection' />
        </div>
        <button onClick={()=>navigate(props.login ? '/login' : '/signup')}>
            {props.login ? 'Log In' : 'Sign Up'}
        </button>
     </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.0rem;
    .logo{
        img{
            height: 3rem;
            cursor: pointer;
            padding-left: 2rem;
        }
    }
    button{
        padding: 0.5rem 1rem;
        background-color: red;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: 800;
        font-size:1.05rem;
        margin-right: 2rem;
        font-family: 'Noto Sans', sans-serif;
        &:hover{
            background-color: #c11119;
        }
    }
`
export default Header
