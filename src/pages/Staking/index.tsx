import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Particles from 'react-tsparticles';
import staking_bg from 'assets/img/staking.svg';
import ComingStakingSmallCard from '../../components/Card/ComingStakingSmallCard';
import StakingSmallCard from '../../components/Card/StakingSmallCard';
import { PoolList } from './data';
import { PoolList1 } from './dat';
import './index.scss';
import coming from 'assets/img/coming.png';



const StakingHome = () => {

    return (
        <div className="home-container">
            <Particles
                style={{ zIndex: -1 }}
                params={{
                    "particles": {
                        "number": {
                            "value": 80,
                        },
                        "color": {
                            "value": "#828282"
                        },
                        "line_linked": {
                            "enable": true,
                            "opacity": 0.05
                        },
                        "size": {
                            "value": 2
                        },
                        "opacity": {
                            "anim": {
                                "enable": true,
                                "speed": 2,
                                "opacity_min": 0.02,
                            }
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            }
                        },
                        "modes": {
                            "push": {
                                "particles_nb": 1
                            }
                        }
                    },
                    "retina_detect": true
                }} />

            <Row>
                <Col md="12" lg="6">
                    <div className='text-center' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={staking_bg} style={{ width: "50%" }} />
                    </div>
                </Col>

                <Col md="12" lg="6" style={{ display: "flex", alignItems: "center" }}>
                    <div>
                    <p className="description-title">{"Stake your tokens to earn Rewards"}</p>
                    <p className="description-body">{"We offer an All Inclusive sollution for everyone! Presale SC and dApp , Vesting sollution for team , and Staking sollution for investors!"}</p>
                        <p className="description-body">{""}</p>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: "60px", marginBottom: "50px" }}>
                {
                    PoolList.map((row, index) => {
                        return (
                            <Col sm="12" md="6" lg="4" xl="3" key={index}>
                                <StakingSmallCard stake={row.stake} earn={row.earn} url={row.url} />
                                  </Col>
                                  
                        );
                    })
                }
            </Row>


          


            <Row style={{ marginTop: "60px", marginBottom: "50px" }}>
                {
                    PoolList1.map((row, index) => {
                        return (
                            <Col sm="12" md="6" lg="4" xl="3" key={index}>
                                <ComingStakingSmallCard stake={row.stake} earn={row.earn} url={row.url} />
                                  </Col>
                                  
                        );
                    })
                }
            </Row>
        </div>
    );
};

export default StakingHome;