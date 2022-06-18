
import React from "react";
import styled from "styled-components";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderImage from "../../img/home-background.jpg"
import { Box } from '@mui/system';


const myStyle={
        backgroundImage: `url(${HeaderImage})`,
        height:'100vh',
        marginTop:'-70px',
        // fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };


export default function Header() {
   let navigate = useNavigate();
  return (
    <div style={myStyle}>
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <Box sx={{ m: 8 }} />
          <h1 className="extraBold font60 " sx={{ m: 40 }} style={{color:"white"}}>BRING NATURE INTO YOUR HOME</h1>
          <HeaderP className="font13 semiBold">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </HeaderP>
            
            <Box >            
            <Button variant="contained" color="primary" onClick={e=>{
                    navigate("/PhotoCollection/:page", { replace: true });
                }} >View Collection</Button>
                </Box>
        </div>
      </LeftSide>
    </Wrapper>
    </div>
  );
}


const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;

const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;



