
import React, { useState } from 'react';
import {
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  ProxyProvider,
  TypedValue,
  BytesValue,
  Egld,
  BigUIntValue,
  ArgSerializer,
  GasLimit,
  DefaultSmartContractController,
  U64Value,
} from '@elrondnetwork/erdjs';
import axios from 'axios';
import Modal from 'react-modal';
import arrow from 'assets/img/arrow.png';
import btxLogo from 'assets/img/logo.png';
import coin from 'assets/img/coin.png';
import elrondLogo from 'assets/img/Elrond logo.png';
import AlertModal from 'components/AlertModal';
import dollarPot from 'assets/img/dollarPot.png';
import { routeNames } from 'routes';
import yes from 'assets/img/link success.png';
import soon from 'assets/img/efoo.png';
import www from 'assets/img/www.png';
import email from 'assets/img/email.png';
import twitterl from 'assets/img/twitterl.png';
import telegraml from 'assets/img/telegraml.png';
import { Link } from 'react-router-dom';
import './index.scss';


import {
  BTX2BTX_CONTRACT_ADDRESS,
  BTX2BTX_CONTRACT_ABI,
  BTX2BTX_CONTRACT_NAME,
  BTX_TOKEN_TICKER,
  BTX_TOKEN_ID,
  BTX_TOKEN_DECIMALS,
} from 'config';
import {
  SECOND_IN_MILLI,
  TIMEOUT,
  convertWeiToEsdt,
  convertTimestampToDateTime,
  convertTimestampToDays,
  convertAPR2APY,
  IContractInteractor,
  getBalanceOfToken,
} from 'utils';
import { version } from 'react-dom';

const Btx2BtxStakingCard = () => {
  const { account, address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const provider = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });

  const [showModal, setShowModal] = useState(false);
  const [isStakeModal, setIsStakeModal] = useState(true);
  const [modalInputAmount, setModalInputAmount] = useState(0);


  const [stakeContractInteractor, setStakeContractInteractor] = React.useState<IContractInteractor | undefined>();
  const [stakeSetting, setStakeSetting] = React.useState<any>();
  const [stakeAccount, setStakeAccount] = React.useState<any>();

  const [balance, setBalance] = React.useState<any>(undefined);

  const [modalInfoMesssage, setModalInfoMesssage] = React.useState<string>('');
  const [modalButtonDisabled, setModalButtonDisabled] = React.useState<boolean>(true);

  const [alertModalShow, setAlertModalShow] = React.useState<boolean>(false);
  const [alertModalText, setAlertModalText] = React.useState<string>('');

  // load smart contract abi and parse it to SmartContract object for tx
  React.useEffect(() => {
    (async () => {
      const registry = await AbiRegistry.load({ urls: [BTX2BTX_CONTRACT_ABI] });
      const abi = new SmartContractAbi(registry, [BTX2BTX_CONTRACT_NAME]);
      const contract = new SmartContract({ address: new Address(BTX2BTX_CONTRACT_ADDRESS), abi: abi });
      const controller = new DefaultSmartContractController(abi, provider);

      setStakeContractInteractor({
        contract,
        controller,
      });
    })();
  }, []); // [] makes useEffect run once


  React.useEffect(() => {
    (async () => {
      if (!stakeContractInteractor) return;

      const interaction = stakeContractInteractor.contract.methods.viewStakeSetting();
      const res = await stakeContractInteractor.controller.query(interaction);

      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const token_id = value.token_id.toString();
      const min_stake_limit = convertWeiToEsdt(value.min_stake_limit, BTX_TOKEN_DECIMALS);
      const max_stake_limit = convertWeiToEsdt(value.max_stake_limit, BTX_TOKEN_DECIMALS);
      const lock_period = value.lock_period.toNumber() * SECOND_IN_MILLI;
      const undelegation_period = value.undelegation_period.toNumber() * SECOND_IN_MILLI;
      const claim_lock_period = value.claim_lock_period.toNumber() * SECOND_IN_MILLI;
      const apr = value.apr.toNumber() / 100;
      const total_staked_amount = convertWeiToEsdt(value.total_staked_amount, BTX_TOKEN_DECIMALS);
      const number_of_stakers = value.number_of_stakers.toNumber();

      const result = {
        token_id,
        min_stake_limit,
        max_stake_limit,
        lock_period,
        undelegation_period,
        claim_lock_period,
        apr,
        total_staked_amount,
        number_of_stakers,
      };

      // console.log('BTX viewStakeSetting', result);

      setStakeSetting(result);
    })();
  }, [stakeContractInteractor]);


  React.useEffect(() => {
    (async () => {
      if (!stakeContractInteractor || !account.address) return;
      const args = [new AddressValue(new Address(account.address))];
      const interaction = stakeContractInteractor.contract.methods.viewStakeAccount(args);
      const res = await stakeContractInteractor.controller.query(interaction);

      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const address = value.address.toString();
      const staked_amount = convertWeiToEsdt(value.staked_amount, BTX_TOKEN_DECIMALS);
      const last_stake_timestamp = value.last_stake_timestamp.toNumber() * SECOND_IN_MILLI;
      const unstaked_amount = convertWeiToEsdt(value.unstaked_amount, BTX_TOKEN_DECIMALS);
      const last_unstake_timestamp = value.last_unstake_timestamp.toNumber() * SECOND_IN_MILLI;
      const collectable_amount = convertWeiToEsdt(value.collectable_amount, BTX_TOKEN_DECIMALS);
      const reward_amount = convertWeiToEsdt(value.reward_amount, BTX_TOKEN_DECIMALS);
      const last_claim_timestamp = value.last_claim_timestamp.toNumber() * SECOND_IN_MILLI;

      const result = {
        address,
        staked_amount,
        last_stake_timestamp,
        unstaked_amount,
        last_unstake_timestamp,
        collectable_amount,
        reward_amount,
        last_claim_timestamp,
      };

      // console.log('BTX viewStakeAccount', result);
      setStakeAccount(result);
    })();
  }, [account, stakeContractInteractor, hasPendingTransactions]);


  React.useEffect(() => {
    if (!address) return;
    getBalanceOfToken(network.apiAddress, account, BTX_TOKEN_ID).then((v) => setBalance(v));
  }, [address, hasPendingTransactions]);

  function onShowStakeModal() {
    if (!account.address) {
      onShowAlertModal('You should connect your wallet first!');
      return;
    }

    setModalInputAmount(0);
    setModalInfoMesssage('');
    setModalButtonDisabled(true);
    setIsStakeModal(true);
    setShowModal(true);
  }

  function onShowUnstakeModal() {
    if (!account.address) {
      onShowAlertModal('You should connect your wallet first!');
      return;
    }

    setModalInputAmount(0);
    setModalInfoMesssage('');
    setModalButtonDisabled(true);
    setIsStakeModal(false);
    setShowModal(true);
  }

  function onModalInputAmountChange(v: any) {
    if (!account.address || !stakeSetting || !stakeAccount) return;

    const value = Number(v);
    let _modalInfoMesssage = '';
    let _modalButtonDisabled = true;
    const currentTimestamp = (new Date()).getTime();

    if (isStakeModal) { // stake
      if (value <= 0) {
        _modalInfoMesssage = 'Invalid amount.';
      } else if (value > balance) {
        _modalInfoMesssage = 'Not enough tokens in your wallet.';
      } else if (value < stakeSetting.min_stake_limit) {
        _modalInfoMesssage = `Cannot stake less than ${stakeSetting.min_stake_limit} ${BTX_TOKEN_TICKER}.`;
      } else if (stakeSetting.max_stake_limit > 0 && stakeAccount.staked_amount + value > stakeSetting.max_stake_limit) {
        _modalInfoMesssage = `Cannot stake more than ${Math.max(stakeSetting.max_stake_limit - stakeAccount.staked_amount, 0)} ${BTX_TOKEN_TICKER}.`;
      } else {
        _modalButtonDisabled = false;
      }
    } else {  // unstake
      if (value <= 0 || value > 100) {
        _modalInfoMesssage = 'Invalid amount.';
      } else if (currentTimestamp < stakeAccount.last_stake_timestamp + stakeSetting.lock_period) {
        _modalInfoMesssage = `Cannot unstake before ${convertTimestampToDateTime(stakeAccount.last_stake_timestamp + stakeSetting.lock_period)}`;
      } else {
        _modalButtonDisabled = false;
      }
    }

    setModalInfoMesssage(_modalInfoMesssage);
    setModalButtonDisabled(_modalButtonDisabled);
    setModalInputAmount(v);
  }

  function onModalMaximize() {
    const value = isStakeModal ? balance : 100;
    onModalInputAmountChange(value);
  }

  function onShowAlertModal(text: string) {
    setAlertModalText(text);
    setAlertModalShow(true);
  }
  async function stake() {
    const args: TypedValue[] = [
      BytesValue.fromUTF8(BTX_TOKEN_ID),
      new BigUIntValue(Egld(modalInputAmount).valueOf()),
      BytesValue.fromUTF8('stake'),
    ];
    const { argumentsString } = new ArgSerializer().valuesToString(args);
    const data = `ESDTTransfer@${argumentsString}`;

    const tx = {
      receiver: BTX2BTX_CONTRACT_ADDRESS,
      gasLimit: new GasLimit(10000000),
      data: data,
    };

    await refreshAccount();
    sendTransactions({
      transactions: tx,
    });

    setShowModal(false);
  }

  async function unstake() {
    const args: TypedValue[] = [
      new U64Value(Math.floor(modalInputAmount * 100)),
    ];
    const { argumentsString } = new ArgSerializer().valuesToString(args);
    const data = `unstake@${argumentsString}`;

    const tx = {
      receiver: BTX2BTX_CONTRACT_ADDRESS,
      data: data,
      gasLimit: new GasLimit(6000000),
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx,
    });

    setShowModal(false);
  }

  async function claim() {
    if (!account.address) {
      onShowAlertModal('You should connect your wallet first!');
      return;
    }

    if (stakeAccount.reward_amount == 0 && stakeAccount.collectable_amount == 0) {
      onShowAlertModal('You don\'t have rewards or collectables to be claimed.');
      return;
    }

    const currentTimestamp = (new Date()).getTime();
    if (currentTimestamp < stakeAccount.last_claim_timestamp + stakeSetting.claim_lock_period) {
      onShowAlertModal(`Cannot claim before ${convertTimestampToDateTime(stakeAccount.last_claim_timestamp + stakeSetting.claim_lock_period)}`);
      return;
    }

    const tx = {
      receiver: BTX2BTX_CONTRACT_ADDRESS,
      data: 'claim',
      gasLimit: new GasLimit(6000000),
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx,
    });
  }

  async function reinvest() {
    if (!account.address) {
      onShowAlertModal('You should connect your wallet first!');
      return;
    }

    if (stakeAccount.reward_amount == 0) {
      onShowAlertModal('You don\'t have rewards for reinvest.');
      return;
    }

    const currentTimestamp = (new Date()).getTime();
    if (currentTimestamp < stakeAccount.last_claim_timestamp + stakeSetting.claim_lock_period) {
      onShowAlertModal(`Cannot reinvest before ${convertTimestampToDateTime(stakeAccount.last_claim_timestamp + stakeSetting.claim_lock_period)}`);
      return;
    }

    const tx = {
      receiver: BTX2BTX_CONTRACT_ADDRESS,
      data: 'restake',
      gasLimit: new GasLimit(6000000),
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx,
    });
  }

  return (
    <div className='card'>
      <div className='stake_earn'>
        <div>
        
        </div>
       
      
      </div>
      
      {/* <p className='description'>
                BitX Finance is a decentralized social economic platform that is making private aviation accessible to anyone
            </p> */}
      {/* <hr className='hr'/> */}
     <div> <img className="responsive logo-animation" src={soon} /><br /></div>
    <br />
     
                               
      <hr className='hr'/>    <br />
                            <p className='heading'>  <h2>About Elrond Football</h2></p>

                            <p className='data'>
$eFOO is an ESDT (Elrond Standard Digital Token) built on the MultiversX Blockchain. <br />
Powered by the revolutionary technology brought to the world by a Romanian team, $eFOO is as fast, secure and scalable as the native EGLD coin itself.<br />

At the same time, the main element of our project is NFTs, which are not only digital works of art, but also a lot of background information, usefulness and benefits make them versatile.<br />
<br /><br /></p> <p className='heading'><h2>Our main vision</h2><br /></p> <p className='data'>

For us, this project is not mainly a source of profit, but rather is the creation, revival and flourishing of a community.<br />

We know that people are generally interested in two things: leisure time and investment. In our free time, we mostly practice our hobbies, for e.g. we play sports, or at least we cheer for our favorite team. <br />
And if we can combine the investment with our favorite leisure time activity, then it’s gaining. In the Elrond Football project we succeeded to achieve this unification.
<br />
Because the required financial fund for operation has been received, in the future we would reinvest it. The best investment is education and community. <br />
Therefore, a certain amount will be used to help education and an amount will be returned in different ways to the benefit of the community. <br />
If the community is using our interfaces, by this are contributing to the working of the project and they help us grow, then we can return more and more valuable $eFOO to the community.
<br />
$eFOO is the token of the Elrond Football project and can be used on the project’s platforms and throughout the MultiversX system.
</p>
<hr className='hr'/> <br /><br />
<p className='heading'><h1>Token & Sales info</h1><br /></p><br /><br /><br />

<div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       
        color: '#23f7dd',
      }}
    >
    
   


<h3>
<tr>
  <td><br />MultiversX Token ticker : TEST-445678<br /><br /></td>
  </tr>
  <tr>
  <td><br />Max supply : 35.000.000<br /><br /></td>

  </tr>
  <tr>
  <td><br />MultiversX explorer : <a href='https://explorer.multiversx.com'>TEST-445678<br /><br /></a></td>
 
  </tr>
  <tr>
  <td>            <br /><h2>                 <u>  Pre-sale round # 1</u> </h2>  <br />                      <br />
 STARTING : March 2022<br />
  SUPPLY : 10.000.000<br />
 PRICE : 0,014 EGLD<br /></td>
  </tr>  
  <tr>
  <td>            <br /><h2>                 <u>  Pre-sale round # 2</u> </h2>  <br />                      <br />
 STARTING : March 2022<br />
  SUPPLY : 10.000.000<br />
 PRICE : 0,014 EGLD<br /></td>
  </tr> 
  <tr>
  <td>            <br /><h2>                 <u>  Pre-sale round # 3</u> </h2>  <br />                      <br />
 STARTING : March 2022<br />
  SUPPLY : 10.000.000<br />
 PRICE : 0,014 EGLD<br /></td>
  </tr> 
  <tr>
  <td>            <br /><h2>                 <u>  Pre-sale round # 4</u> </h2>  <br />                      <br />
 STARTING : March 2022<br />
  SUPPLY : 10.000.000<br />
 PRICE : 0,014 EGLD<br /></td>
  </tr> 
  
</h3><br />

</div>



  <><br /><br /><br /><br /><br /><Link to={routeNames.efooPresale}>
    <div><button
      className='claimReward_button'>
      Go to PRESALE page
    </button></div>
  </Link><br /><a href="https://www.elrondfootball.com/"><button
    className='claimReward_button'>
    WEBSITE
  </button></a><br /><a href="https://twitter.com/Elrond_Football"><button
    className='claimReward_button'>
    TWITTER
  </button></a><br /><a href="https://t.me/elrondfootball"><button
    className='claimReward_button'>
    TELEGRAM
  </button></a><br /><a href="mailto:elrondfootballnfts@gmail.com"><button
    className='claimReward_button'>
    SEND EMAIL
  </button></a><br /><a href="https://medium.com/@elrondfootball/elrond-football-projects-whitepaper-5184093adb20"><button
    className='claimReward_button'>
    WHITEPAPER
  </button></a><br /><hr className='hr' /><br /><br /><div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: '20px' }}>

    </div><Modal
      isOpen={showModal}
      onRequestClose={() => {
        setShowModal(false);
      } }
      ariaHideApp={false}
      className='modalcard box-shadow'
    >
      <img className={"coin"} src={coin} />
      <div className='modaldiv'>
        <h3 className='modalHeader'>
          {isStakeModal ? 'Stake' : 'Unstake'}
        </h3>
      </div>
      <p className='modal-description'>
        {showModal && stakeSetting && (isStakeModal ?
          `Your tokens will be locked for ${convertTimestampToDays(stakeSetting.lock_period)} days after deposit (even the tokens that are already staked)`
          : `Your tokens will be undelegated for ${convertTimestampToDays(stakeSetting.undelegation_period)} days after unstake (even the tokens that are already unstaked)`)}
      </p>
      <div className='modal-divider'></div>
      <div
        style={{
          marginTop: '15px'
        }}
        className='font-24'
      >
        <span>{isStakeModal ? 'Balance' : 'Staked'}:&nbsp;&nbsp;</span>
        <span style={{ color: '#FEE277', fontWeight: 600, fontSize: '1rem' }}>
          {showModal && (isStakeModal ? balance : stakeAccount.staked_amount)}
        </span>
        <span>&nbsp;{BTX_TOKEN_TICKER}</span>
      </div>
      <h6 className='modal-info-1'>
        {isStakeModal ? 'Amount to Stake' : 'Percentage to Unstake'}
      </h6>
      <div className='modal-div-1'>
        <input className='modal-input-1'
          placeholder={isStakeModal ? 'Amount' : 'Percentage'}
          type='number'
          step={0.01}
          value={modalInputAmount}
          onChange={(e) => onModalInputAmountChange(e.target.value)} />
        {!isStakeModal && (<span className='stake-modal-input-percentage'>%</span>)}
        <button className='maximize-button'
          onClick={onModalMaximize}
        >
          MAX
        </button>
      </div>
      <div className='modal-divider' style={{ paddingTop: "20px" }}></div>
      <div className='modal-info-message'>
        {modalInfoMesssage}
      </div>
      {isStakeModal ? (
        <button
          className='modal-submit-button'
          onClick={stake}
          disabled={modalButtonDisabled}
        >
          Stake
        </button>
      ) : (
        <button
          className='modal-submit-button'
          onClick={unstake}
          disabled={modalButtonDisabled}
        >
          Unstake
        </button>
      )}
    </Modal><AlertModal
      show={alertModalShow}
      onHide={() => setAlertModalShow(false)}
      alertmodaltext={alertModalText} /></>
    </div>
  );
};

export default Btx2BtxStakingCard;