import { dAppName } from 'config';
import VaultVesting from 'pages/Vesting/vaultVesting';
import withPageTitle from './components/PageTitle';
import BTXFinanceHome from './pages';
import NFTStaking from './pages/NFTStaking';
import NFTMint from './pages/NFTMint';
import PreSale from './pages/Presale';
import StakingHome from './pages/Staking';
import BitXStaking from './pages/Staking/BitXStaking';
import CpaStaking from './pages/Staking/CpaStaking';
import DiceStaking from './pages/Staking/DiceStaking';
import xxxStaking from './pages/Staking/xxxStaking';
import EfooStaking from './pages/Staking/EfooStaking';
import LpadStaking from './pages/Staking/LpadStaking';
import MareStaking from './pages/Staking/MareStaking';
import Benefits from './pages/Benefits';
import Whitepaper from './pages/Whitepaper';
import Roadmap from './pages/Roadmap';
import Apply from './pages/Apply';
import Dao from './pages/Dao';
import Sent from './pages/Apply/Sent';
import Efoo from './pages/Launchpad/EFOO';
import BitLock from './pages/Vesting';
import CreateVesting from './pages/Vesting/createVesting';
import Farms from './pages/Farms';
import EfooPresale from './pages/EfooPresale';
import Convert from './pages/Convert';

export const routeNames = {
  home: '/',

  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',

  staking: '/staking',
  bitxstaking: '/btx-pool',
  dicestaking: '/dice-pool',
  marestaking: '/mare-pool',
  xxxstaking: '/xxx-pool',
  cpastaking: '/cpa-pool',
  lpadstaking: '/lpad-pool',
  efoostaking: '/efoo-pool',
  benefits: '/benefits',
  whitepaper: '/whitepaper',
  roadmap: '/roadmap',
  apply: '/apply',
  dao: '/dao',
  sent: '/apply/sent',
  efoo: '/launchpad/efoo',
  efooPresale: '/efoopresale',
  presale: '/presale',
  nftmint: '/nft-mint',
  nftstaking: '/nft-staking',
  convert: '/convert',

  bitlock: '/bitlock',
  createvesting: '/bitlock/create-vesting',
  vaultvesting: '/bitlock/vault-vesting/*',
  farms: '/farms'
};

const routes: Array<any> = [
  {
    path: routeNames.staking,
    title: 'Staking',
    component: StakingHome
  },

  {
    path: routeNames.apply,
    title: 'Apply',
    component: Apply
  },
  {
    path: routeNames.convert,
    title: 'Convert',
    component: Convert
  },
  {
    path: routeNames.efoo,
    title: 'Efoo',
    component: Efoo
  },
  {
    path: routeNames.efooPresale,
    title: 'Efoo Presale',
    component: EfooPresale
  },

  {
  path: routeNames.sent,
  title: 'Sent',
  component: Sent
},

  {
    path: routeNames.benefits,
    title: 'Benefits',
    component: Benefits
  },

 {
    path: routeNames.dao,
    title: 'Dao',
    component: Dao
  },

  {
    path: routeNames.whitepaper,
    title: 'Whitepaper',
    component: Whitepaper
  },

  {
    path: routeNames.roadmap,
    title: 'Roadmap',
    component: Roadmap
  },

  {
    path: routeNames.nftmint,
    title: 'NFT Mint',
    component: NFTMint
  },

  {
    path: routeNames.home,
    title: 'BTX Finance',
    component: BTXFinanceHome
  },

  {
    path: routeNames.bitxstaking,
    title: 'BTX Pool',
    component: BitXStaking
  },

  {
    path: routeNames.dicestaking,
    title: 'Dice Pool',
    component: DiceStaking
  },

  {
    path: routeNames.efoostaking,
    title: 'Efoo Pool',
    component: EfooStaking
  },

  {
    path: routeNames.marestaking,
    title: 'Mare Pool',
    component: MareStaking
  },

   {
     path: routeNames.xxxstaking,
     title: 'xxx Pool',
     component: xxxStaking
   },

  {
    path: routeNames.cpastaking,
    title: 'Cpa Pool',
    component: CpaStaking
  },

  {
    path: routeNames.lpadstaking,
    title: 'Lpad Pool',
    component: LpadStaking
  },

  {
    path: routeNames.bitlock,
    title: 'Bit Lock',
    component: BitLock
  },

  {
    path: routeNames.createvesting,
    title: 'Create Vesting',
    component: CreateVesting,
    authenticatedRoute: true,
  },

  {
    path: routeNames.vaultvesting,
    title: 'Vault Explorer',
    component: VaultVesting
  },

  {
    path: routeNames.nftstaking,
    title: 'NFT Staking',
    component: NFTStaking
  },

  {
    path: routeNames.farms,
    title: 'Farms',
    component: Farms
  },

  {
    path: routeNames.presale,
    title: 'PreSale',
    component: PreSale
  },
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • ${dAppName}`
    : `${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
