import * as React from 'react';
import Components from './Components';
import { enableVote } from 'config';
import TopInfo from 'components/TopInfo';

const Dashboard = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
         <div className='card-body p-1'>
         <TopInfo />
              {!!enableVote && (
                <div>
                  <Components />
                </div>
              )}
              {!enableVote && (
                <div>
                  <hr />
                  <p>DAO is not currently available !</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
