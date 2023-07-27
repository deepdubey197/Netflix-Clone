import React from 'react'
import styled from 'styled-components'
const BackgroundImage = () => {
  return (
    <BackgroundContainer>
        <img src='https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg' alt='no internet connection'/>
    </BackgroundContainer>
  )
}
const BackgroundContainer=styled.div`
    height: 100vh;
    width: 100vw;
    img{
        height:100vh;
        width:100vw;
    }
`    
export default BackgroundImage
