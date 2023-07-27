import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Player = () => {
  const navigate = useNavigate();
  return (
    <PlayerContainer>
       <div className='player'>
          <div className='backArrow'>
            <BsArrowLeft onClick={()=>navigate(-1)}/>
          </div>
          <video src='https://rr5---sn-cvh7knsz.googlevideo.com/videoplayback?expire=1690243480&ei=OL2-ZJDRFfHh2roPhf2K4Ag&ip=180.76.13.11&id=o-AOPgV_cGC4k6HudCaZxsTj3E-bZmqJVyVnpCvODfKuDs&itag=22&source=youtube&requiressl=yes&bui=AYlvQAsxv-L_6v_9g6PvsxGm2Qakod0JeEbabp8MP0iFP0j5xeoCbNkyMDkG78XwNRi-wfX3CbdKYU3czF7ekieh9OBvXSkG&spc=Ul2Sq56iEnqN2_w-RLihoxVyaQEpEEQ&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=135.558&lmt=1673658401000239&fexp=24007246,51000012,51000022&c=ANDROID&txp=1432434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAPU-J6XCbs-J72KrPDJdge3EyaY4llNLB2Rnw4rMhb2_AiEA7Ho4ygeVRcRJ3PDTHO5SQTR4viKxni3HRqwEJ-0GXXg%3D&redirect_counter=1&rm=sn-i3b6z7s&req_id=78f139b48603a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=TD&mip=103.88.134.186&mm=31&mn=sn-cvh7knsz&ms=au&mt=1690221513&mv=u&mvi=5&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhANdHaiue2O04iAVN1cAtapdHqYyf2MtKN0mHmt0pVMXaAiAyk3NW8m5Bfv4CV9Y-aliquGWCIcp814sHF2PjvGvQ6Q%3D%3D' 
          autoPlay loop controls />
       </div>

    </PlayerContainer>
  )
}


const PlayerContainer=styled.div`
.player{
  width: 100vw;
  height: 100vh;
  .backArrow{
    position: absolute;
    padding: 2rem;
    z-index:1;
    svg{
      font-size: 3rem;
      cursor: pointer;
      color: white;
    }

  }
  video{
    height: 100%;
    width: 100%;
  }
}
`

export default Player
