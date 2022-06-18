import { Button } from '@mui/material';
import React from 'react';
import { Navbar,Nav,Container } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import userService from '../Services/userService';
import './NavBar.css';

const NavBar = () => {
  let navigate = useNavigate();
  const handleLoginClick = ()=>{
    navigate("/ailurophile-gallery/login", { replace: true });
}
const handleRegisterClick = ()=>{
    navigate("/ailurophile-gallery/register", { replace: true });
}
    return ( 
       <Navbar collapseOnSelect bg="light" expand="lg">
  <Container>
  <Navbar.Brand ><Link className='NavItem' to='/' >Ailurophile-Gallery</Link></Navbar.Brand>
  <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mx-auto" fixed="top">

        <Nav.Link className="px-3">
                <Link className='NavItem' to='/' >Home</Link>
        </Nav.Link>

        <Nav.Link className="px-3">
                <Link className='NavItem' to='/PhotoCollection/:page' >Collection</Link>
        </Nav.Link>

        <Nav.Link className="px-3">
                <Link className='NavItem' to='/contact-us' >Contact Us</Link>
        </Nav.Link>

        {/* <Nav.Link className="px-3">
                <Link className='NavItem' to='/about'  >About</Link>
         </Nav.Link> */}
    </Nav>
    <Nav>
      <Nav.Link >
              {!userService.isLoggedIn() ? 
              <>
              <Button  variant='text' size="medium"  onClick={handleRegisterClick}>Register</Button>
              <Button  variant='text' size="medium"  onClick={handleLoginClick}>LOGIN</Button>
              </>
                :<Button color="primary" onClick={e=>{
                userService.logout();
                navigate("/", { replace: true });
                window.location.reload();
                        }}>
                <LogoutIcon fontSize="large" />{userService.getLoggedInUser().role}
        </Button>
        }
        </Nav.Link>
    </Nav>
        
  </Navbar.Collapse>
  </Container>
</Navbar> 
     );
}
 
export default NavBar;