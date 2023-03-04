import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import { contractAddress } from 'config';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-1'>
      <p className='data'>  <h1>Swap 4000 BTX for 1 BitXCoin</h1></p>
      </div>
     
      <div>
        <h3 className='py-2'>
         
        </h3>
      </div>
    </div>
  );
};

export default TopInfo;
