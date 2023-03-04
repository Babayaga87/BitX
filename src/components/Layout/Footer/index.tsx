import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import './index.scss';
import {
  SOCIAL_WEBSITE_URL
} from '../../../config';
import contact from 'assets/img/contact.png';
import twitter from 'assets/img/twitter.png';
import telegram from 'assets/img/telegram.png';

const Footer = () => {
  return (
    <footer className='text-center'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href={SOCIAL_WEBSITE_URL}
        >
          Made with <HeartIcon className='mx-1' /> by New BitX Finance.
        </a>
        <a href="https://t.me/BtxFinance"><img src={contact} width="50"/></a>
        <a href="https://twitter.com/bitxfinance"><img src={twitter} width="60"/></a>
        <a href="https://t.me/BitXFinanceOfficial"><img src={telegram} width="50"/></a>
        <br /><iframe src="https://egld.community/api/products/d21f6dbf-6d8c-46a7-a81e-40dc5a402555/upvotes/embed?theme=primary&size=md" width="170" height="58"></iframe>
      </div>
    </footer>
  );
};

export default Footer;
