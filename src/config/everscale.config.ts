// import gbAddresses from 'true-nft-contracts/build/addresses.json';
import * as process from 'process';
import { networksEnum } from './enums/networks.enum';

const envEndpoints = process.env.NEXT_PUBLIC_TON_SERVER_ADDRESS;
const EVERSCALE_SERVER_ENDPOINTS = envEndpoints ? envEndpoints.split(',') : [];

const NETWORKS = {
  [networksEnum.mainNet]: 'ever.live',
  [networksEnum.rdflNet]: 'rfld.ever.live',
  [networksEnum.devNet]: 'net.ever.live',
};

const EVERSCALE_NETWORK = process.env.NEXT_PUBLIC_EVERSCALE_NETWORK ?? networksEnum.devNet;
const EVERSCALE_EXPLORER = NETWORKS[EVERSCALE_NETWORK];

const MAIN_NET = EVERSCALE_NETWORK === networksEnum.mainNet || EVERSCALE_NETWORK === networksEnum.rdflNet;

// for extraton
const EXTRATON_NETWORK = MAIN_NET ? 'main.ton.dev' : 'net.ton.dev';

// const DEPRECATED_ACCOUNT_ADDRESSES = {
//   NftRoot: process.env.NEXT_PUBLIC_NFT_ROOT || gbAddresses.NftRoot,
//   SellRoot: process.env.NEXT_PUBLIC_SELL_ROOT || gbAddresses.SellRoot,
//   AuctionRoot: process.env.NEXT_PUBLIC_AUCTION_ROOT || gbAddresses.AuctionRoot,
//   AuthDebot: process.env.AUTH_DEBOT || '0:48ce6f17c65fb596a4bfbd1098dc61feffeed075da9edf69009a15ee225f1e5d',
// };

export {
  EVERSCALE_SERVER_ENDPOINTS,
  EVERSCALE_NETWORK,
  EXTRATON_NETWORK,
  MAIN_NET,
  EVERSCALE_EXPLORER,
  // DEPRECATED_ACCOUNT_ADDRESSES,
};
