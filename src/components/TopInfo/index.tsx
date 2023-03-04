import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import {
  elrondExplorerUrl,
} from 'config';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <div className='text-white' data-testid='topInfo'>
     
       <div>
        <h3 className='py-2'>
          <DappUI.Denominate value={account.balance} data-testid='balance' />
        </h3>
      </div> 
    </div>
  );
};

export default TopInfo;
