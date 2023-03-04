import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Navbar as BsNavbar, NavItem, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import logo from '../../../assets/img/BTX.png';
import './index.scss';
import TopInfo from 'components/TopInfo';
import {
  useSignMessage,
  useGetSignMessageInfoStatus,
  useGetLastSignedMessageSession
} from '@multiversx/sdk-dapp/hooks/signMessage';
import { SignedMessageStatusesEnum } from '@multiversx/sdk-dapp/types';
import { Loader } from '@multiversx/sdk-dapp/UI';


const Navbar = () => {
  const { address } = useGetAccountInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };


  const isLoggedIn = Boolean(address);

  return (
    <BsNavbar className='px-4 py-3' expand='lg' collapseOnSelect style={{ background: "#141414", borderBottom: "1px solid #707070" }}>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0 c-logo-container'
          to={routeNames.home}
        >
          <img src={logo} />
          <span>{"                    "}</span>
        </Link>
        <TopInfo />
        <BsNavbar.Toggle aria-controls='responsive-navbar-nav' style={{ background: "#D8D3D3" }} />
        <BsNavbar.Collapse id='responsive-navbar-nav' className='nav-menu-wrap'>
          <Nav className='ml-auto'>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Staking"
              className='custom-navbar-button custom-navbar-normal-button'
            >
              <NavDropdown.Item id="nav-dropdown-dark-example" onClick={() => { navigate(routeNames.staking); }}>
                Home
              </NavDropdown.Item>
            {/*    <NavDropdown.Item onClick={() => { navigate(routeNames.xxxstaking); }}>
              BitXCOIN Pool
              </NavDropdown.Item>*/}
              <NavDropdown.Item id="nav-dropdown-dark-example" onClick={() => { navigate(routeNames.bitxstaking); }}>
                BTX Pool
              </NavDropdown.Item>
              <NavDropdown.Item id="nav-dropdown-dark-example" onClick={() => { navigate(routeNames.dicestaking); }}>
                Dice Pool
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => { navigate(routeNames.marestaking); }}>
                Mare Pool
              </NavDropdown.Item>
             {/*  <NavDropdown.Item onClick={() => { navigate(routeNames.joystaking); }}>
                JOY Pool
              </NavDropdown.Item> */}
              
              <NavDropdown.Item onClick={() => { navigate(routeNames.lpadstaking); }}>
                Lpad Pool
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => { navigate(routeNames.cpastaking); }}>
                Cpa Pool
              </NavDropdown.Item>
             
            </NavDropdown>

           

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Launchpad"
              className='custom-navbar-button custom-navbar-normal-button'
            >
            {/*   <NavDropdown.Item id="nav-dropdown-dark-example" onClick={() => { navigate(routeNames.efoo); }}>
               ElrondFootball
            </NavDropdown.Item>*/}
              <NavDropdown.Item id="nav-dropdown-dark-example">
               Next project SOON
              </NavDropdown.Item>
            {/*    
                <NavDropdown.Item id="nav-dropdown-dark-example" onClick={() => { navigate(routeNames.whitepaper); }}>
                Whitepaper
              </NavDropdown.Item>
             <NavDropdown.Item id="nav-dropdown-dark-example" onClick={() => { navigate(routeNames.roadmap); }}>
                Roadmap
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => { navigate(routeNames.hetostaking); }}>
                Heto Pool
              </NavDropdown.Item> 
              
              <NavDropdown.Item onClick={() => { navigate(routeNames.lpadstaking); }}>
                Lpad Pool
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => { navigate(routeNames.cpastaking); }}>
                Cpa Pool
              </NavDropdown.Item>*/}
            </NavDropdown>
            <Link to={routeNames.benefits} className='custom-navbar-button custom-navbar-normal-button'>
              Info
            </Link>
<Link to={routeNames.presale} className='custom-navbar-button custom-navbar-normal-button'>
              BUY BTX
            </Link>
            <Link to={routeNames.convert} className='custom-navbar-button custom-navbar-normal-button'>
              SWAP
            </Link>
              <Link to={routeNames.dao} className='custom-navbar-button custom-navbar-normal-button'>
              DAO
            </Link>
            
         
           {/* <Link to={routeNames.presale} className='custom-navbar-button custom-navbar-normal-button'>
              BitXCOIN sale
            </Link>*/}
            <Link to={routeNames.bitlock} className='custom-navbar-button custom-navbar-normal-button'>
              Bitlock 
            </Link>
             <Link to={routeNames.apply} className='custom-navbar-button custom-navbar-normal-button'>
              APPLY
            </Link>
         {/*  <Link to={routeNames.nftstaking} className='custom-navbar-button custom-navbar-normal-button'>
              Convert
            </Link> */}
            {/*   <Link to={routeNames.nftmint} className='custom-navbar-button custom-navbar-normal-button'>
              NFT Mint
            </Link>
            <Link to={routeNames.farms} className='custom-navbar-button custom-navbar-normal-button'>
              Farms
            </Link>*/}

           

            {isLoggedIn ? (
              <NavItem className='custom-navbar-button auth-button' onClick={handleLogout}>
                Disconnect
              </NavItem>
            ) : (
              <Link to={{ pathname: routeNames.unlock }} state={{ pastURL: location.pathname }} className='custom-navbar-button auth-button'>
                Connect Wallet
              </Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </div>
    </BsNavbar>
   
  ); 
};

export default Navbar;
