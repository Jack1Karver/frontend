import { signerNone, TonClient } from '@tonclient/core';
import { Account } from '@tonclient/appkit';


import { NftRootContract } from '@/../true-nft-contracts/contracts-compiled/NftRootContract';
import { SellRootContract } from '@/../true-nft-contracts/contracts-compiled/market/SellRootContract';
import { AuctionRootContract } from '@/../true-nft-contracts/contracts-compiled/market/AuctionRootContract';
import ContractsService from './ContractsService';

import { DEPRECATED_ACCOUNT_ADDRESSES } from '@/config/everscale.config';
import { IContractsControllerWeb } from './interfaces/contracts-controller-web.interface';
import { ICar } from '@/interfaces/car.interface';
import { IOffer } from '@/interfaces/offer.interface';

export abstract class AbstractContractsControllerWeb implements IContractsControllerWeb<IExtensionResponse> {
  readonly client: TonClient;
  readonly contractsService: ContractsService;
  readonly nftRoot: Account;
  readonly sellRoot: Account;
  readonly auctionRoot: Account;
  readonly addresses: AccountsAddresses;

  constructor() {
    this.contractsService = new ContractsService();
    this.client = this.contractsService.client;
    this.addresses = DEPRECATED_ACCOUNT_ADDRESSES;

    // eslint-disable-next-line
    // @ts-ignore
    this.nftRoot = new Account(NftRootContract, {
      signer: signerNone(),
      client: this.client,
      address: this.addresses.NftRoot,
    });

    this.sellRoot = new Account(SellRootContract, {
      signer: signerNone(),
      client: this.client,
      address: this.addresses.SellRoot,
    });

    this.auctionRoot = new Account(AuctionRootContract, {
      signer: signerNone(),
      client: this.client,
      address: this.addresses.AuctionRoot,
    });
  }

  abstract mintTip4Token({
    json,
    royalty,
  }: {
    json: string;
    royalty: number;
  }): Promise<IExtensionResponse>;


  abstract sellToken(car: ICar, price: number): Promise<IExtensionResponse>;


  abstract buyToken(car: ICar): Promise<IExtensionResponse>;

  abstract cancelSell(offer: IOffer): Promise<IExtensionResponse>;

}

// TODO: move all to another places
type AccountsAddresses = {
  NftRoot: string;
  SellRoot: string;
  AuctionRoot: string;
};
