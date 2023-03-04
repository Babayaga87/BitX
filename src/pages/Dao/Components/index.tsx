import * as React from 'react';
import {
  deadTokenId,
  enableVote,
  voteAddress,
  voteAddress2,
  voteFinishData,
  voteNoData,
  voteOwnerAddress,
  voteWithdrawData,
  voteYesData
} from 'config';
import Vote from './Vote';
import www from './www.png';
import telegram from './telegram.png';
import twitter from './twitter.png';

const Components = () => {
  return (
    <div className='col mt-4 col-md-12'>
      {!!enableVote && (
        <div>
          <hr />
          <Vote
            voteAddress={voteAddress}
            voteOwnerAddress={voteOwnerAddress}
            voteYesData={voteYesData}
            voteNoData={voteNoData}
            voteFinishData={voteFinishData}
            voteWithdrawData={voteWithdrawData}
            deadTokenId={deadTokenId}
          />
          
          {/* <hr />
          <Vote
            voteAddress={voteAddress2}
            voteOwnerAddress={voteOwnerAddress}
            voteYesData={voteYesData}
            voteNoData={voteNoData}
            voteFinishData={voteFinishData}
            voteWithdrawData={voteWithdrawData}
            deadTokenId={deadTokenId}
          /> */}
        </div>
      )}
      {/* <hr />
      <div>
        <h2 style={{textAlign: "center"}}>Project info</h2>
        <h4 style={{textAlign: "center"}}>Informations about project!</h4><br /><br /><br />
       <a href="https://google.com"> <img src={www} width='70' /></a>
       <a href="https://google.com"> <img src={telegram} width='70'/></a>
       <a href="https://google.com"> <img src={twitter} width='80'/></a>
      </div>*/}



      




    </div>
  );
};

export default Components;
