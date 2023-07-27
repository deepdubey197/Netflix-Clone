import React from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth,signOut } from 'firebase/auth'
const TopNav = () => {
    const history=useNavigate();
    
    const handleSignOut=()=>{
        const auth=getAuth();
        signOut(auth).then(()=>{
            console.log('Logout Successful');
            history('/login');
        })
        .catch((error)=>{
            console.log('Logout Error:',error);
        });
    };


    const navlinks=[
        {name:'Home', link:'/'},
        {name:'Tv Show', link:'/tv'},
        {name:'My List', link:'/mylist'},
        {name:'Movies', link:'/movies'},
    ]
  return (
    <NavContainer>
    <div className='leftSide'>
        <div className='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' alt='logo' />
        </div>
        <ul className='links'>
            {
                navlinks.map(({name,link})=>{
                    return(
                        <li key={name}>
                            <StyledLink to={link}>{name}</StyledLink>
                        </li>
                    )
                })
            }
        </ul>
    </div>
    <div className='rightSide'>
            <button onClick={handleSignOut}>
              <AiOutlineLogout/>
            </button>
    </div>

    </NavContainer>
  )
}

const NavContainer = styled.div`
z-index: 1000;
 position: fixed; /* Set the position to fixed */
    top: 0; /* Stick the component to the top of the page */
    left: 0; /* Stick the component to the left of the page */
    width: 100%; /* Set the width to 100% */
    background-color: #000; /* Add background color */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.0rem;
    .logo{
        img{
            height: 3rem;
            cursor: pointer;
            padding-left: 1rem;
            padding-right: 3rem;
        }
    }

    .navlinks{
        position: fixed;
    top: 0;
    left: 0;

    }
    .leftSide {
        display: flex;
        align-items: flex-start;
    }

    .links {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
        padding-top: 9px;
        gap: 3rem; /* Adjust spacing between links */
        text-decoration: none;

    }
    .rightSide {
        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: #fff;
        }
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none; /* Remove underline */
    color: #fff; /* Set link color */
    font-size: 1.2rem; /* Set font sizet */
    
    
    &:visited {
        color: #fff; /* Prevent color change on clicking */
    }
    
    &:hover {
        /* You can add hover styles if needed */
    }
`;
export default TopNav;
