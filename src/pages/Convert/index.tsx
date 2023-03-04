import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              
                  <TopInfo />
                
                  <Actions />
                  <br />
                  * <u><b>SWAP BitXCoin to BTX WILL BE ACTIVE STARTING Q3 2023</b></u><br />
                  * Only 882 BitXCoin availlable for this round<br />
                  * You can only swap 4000 BTX in one transaction!
                </div>
                <div className='custom-buy-card-info color-white'><h2>BitXCoin info :</h2></div>
                  <div className='data'> </div>
                  <div className='data'>Total supply = 10.000 BitXCOIN</div>
  
                <div className='data'>Can be bought only with BTX</div>
             
              <div className='data'>Will be 8 round with 1000 BitXCOIN each</div>
                <div className='data'>#1 ROUND price = 4000 BTX / BitxCOIN -- 882 BitXCoin availlable</div>
                <div className='data'>#2 ROUND price = 5000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div>
                <div className='data'>#3 ROUND price = 6000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div>
                <div className='data'>#4 ROUND price = 7000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div>
                <div className='data'>#5 ROUND price = 8000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div>
                <div className='data'>#6 ROUND price = 9000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div>
                <div className='data'>#7 ROUND price = 10000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div>
                <div className='data'>#8 ROUND price =11000 BTX / BitxCOIN -- 1000 BitXCoin availlable</div><br />
                <div className='data'>* 80 % from BTX collected will be burned </div>
                <div className='data'>* 20 % will be added as reward !</div>
             
              </div>
              
           
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
