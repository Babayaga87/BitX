import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './index.scss';
import { Link } from 'react-router-dom';
import BitlockImg from 'assets/img/bitlock.png';
import BTXFinanceHomeLogo from 'assets/img/BTXFinance Logo.png';
import NFTStakingImg from 'assets/img/NFT staking.png';
import NFTStaking1Img from 'assets/img/NFT staking1.png';
import NFTImg from 'assets/img/NFT.png';
import PresaleImg from 'assets/img/presale.png';
import StakingImg from 'assets/img/staking.png';
import FarmImg from 'assets/img/LP Farm.png';
import coin from 'assets/img/lock1.png';
import sale from 'assets/img/sale.png';
import stake from 'assets/img/stake.png';
import telegram from 'assets/img/telegram.png';
import join from 'assets/img/join.png';
import zero from 'assets/img/zero.png';
import soon from 'assets/img/efoo.gif';

import { routeNames } from 'routes';

const BTXFinanceHome = () => {
    return (
        <div className="text-center" style={{ marginBottom: "30px" }}>
             
            <img className="responsive logo-animation" src={BTXFinanceHomeLogo}  />
          {/*   <Link to={routeNames.efoo}> <img className="responsive logo-animation" src={soon} />
            </Link>*/}<br /><br /><br /><br />
            <div className="button-group-bar">
                <div className="button-group-container">
                    <Row>
                        <Col xs="6" sm="3">
                            <Link to={routeNames.staking}>
                                <div className="BTX-home-but">
                                    <img src={StakingImg} />
                                    <p>STAKING</p>
                                </div>
                            </Link>
                        </Col>
{/*                       
                        <Col xs="6" sm="3">
                            <Link to={routeNames.nftmint}>
                                <div className="BTX-home-but">
                                    <img src={NFTImg} />
                                    <p>NFT MINT</p>
                                </div>
                            </Link>
                        </Col>
                        
                        <Col xs="6" sm="3">
                            <Link to={routeNames.dao}>
                                <div className="BTX-home-but">
                                    <img src={NFTStakingImg} />
                                    <p>DAO</p>
                                </div>
                            </Link>
                        </Col> */}  
                        <Col xs="6" sm="3">
                            <Link to={routeNames.bitlock}>
                                <div className="BTX-home-but">
                                    <img src={BitlockImg} />
                                    <p>BITLOCK</p>
                                </div>
                            </Link>
                        </Col>
                 
                      <Col xs="6" sm="3">
                            <Link to={routeNames.presale}>
                                <div className="BTX-home-but">
                                    <img src={StakingImg} />
                                    <p>BUY BTX</p>
                                </div>
                            </Link>
                    </Col> 
                    <Col xs="6" sm="3">
                            <Link to={routeNames.convert}>
                                <div className="BTX-home-but">
                                    <img src={PresaleImg} />
                                    <p>SWAP</p>
                                </div>
                            </Link>
                    </Col> 
                               <Col xs="6" sm="3">
                            <Link to={routeNames.dao}>
                                <div className="BTX-home-but">
                                    <img src={FarmImg} />
                                    <p>DAO</p>
                                </div>
                            </Link>
</Col> 
<Col xs="6" sm="3">
                            <Link to={routeNames.apply}>
                                <div className="BTX-home-but">
                                    <img src={NFTStakingImg} />
                                    <p>PROJECT APPLY</p>
                                </div>
                            </Link>
</Col> 

                    </Row>






                    
                </div>
            </div>

            
            <div className="button-group-bar"> 
                <div className="button-group-container">
                <Link to={routeNames.apply}>
                                <div className="BTX-home-but">
                            
                            
                                </div>
                            </Link>
                    
                   
                    <Row>
                    <Col xs="6" sm="3">
                            <Link to={routeNames.bitlock}>
                                <div className="BTX-home-but">
                                <img src={coin} />
                                    <p>Vesting for Team</p>
                                    <p className="description-title">{"Let's talk about TRUST ! Everyone can now use Our BitLOCK Smart Contract for vesting team , advisors or early investors tokens for a custom time and releases!"}</p>
                    
                                </div>
                            </Link>
                        </Col>


                        <Col xs="6" sm="3">
                            <Link to={routeNames.presale}>
                            <div className="BTX-home-but">
                            <img src={sale} />
                                    <p>Token Sale</p>
                                    <p className="description-title">{"After team allocation is safe in BitLock , let's start with token SALE step! We take care about Smart Contract and dAPP!"}</p>
                    
                                </div>
                            </Link>
                        </Col>
{/*                       
                        <Col xs="6" sm="3">
                            <Link to={routeNames.nftmint}>
                                <div className="BTX-home-but">
                                    <img src={NFTImg} />
                                    <p>NFT MINT</p>
                                </div>
                            </Link>
                        </Col>
    */}                       
                      
                        <Col xs="6" sm="3">
                            <Link to={routeNames.staking}>
                                <div className="BTX-home-but">
                                <img src={stake} />
                                    <p>Staking</p>
                                    <p className="description-title">{"Our Staking platform offers a customizable staking pool for your investors ! You can choose APR and others options for best experience"}</p>
                    
                                </div>
                            </Link>
                        </Col>
                       {/* <Col xs="6" sm="3">
                            <Link to={routeNames.farms}>
                                <div className="BTX-home-but">
                                    <img src={FarmImg} />
                                    <p>LP FARMS</p>
                                </div>
                            </Link>
</Col> 
*/}
                        <Col xs="6" sm="3">
                        <Link to={routeNames.apply}>
                                <div className="BTX-home-but">
                                    <img src={zero} />
                                    <p>Zero initial costs !</p>
                                    <p className="description-title">{"Are you ready? Contact us and start your journey! You have the ideea...we have the technology!"}</p>
                    
                                </div>
                            </Link>
                        </Col>
                    </Row>






                    
                </div>
            </div>






        </div >














    );
};

export default BTXFinanceHome;