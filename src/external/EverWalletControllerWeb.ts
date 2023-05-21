import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

import { MARKETPLACE } from '@/config/marketplace.config';
import { toNano } from '@/utils/contract.utils';
import { AbstractContractsControllerWeb } from './AbstractContractsControllerWeb';
import EverWalletClient from '@/utils/wallet/EverWalletClient';
import { ICar } from '@/interfaces/car.interface';
import { IOffer } from '@/interfaces/offer.interface';
import { ROOTS } from '@/config/ton.config';

export default class EverWalletControllerWeb extends AbstractContractsControllerWeb {
  readonly ewClient: EverWalletClient;

  constructor(ewClient: EverWalletClient) {
    super();
    this.ewClient = ewClient;
  }

  async mintToken({ name, url }: { name: string; url: string }): Promise<IExtensionResponse> {
    try {
      const userAddress = await this.getUserAddress();

      const transactionRes = await this.provider.sendMessage({
        sender: new Address(userAddress),
        recipient: new Address(ROOTS.nftRoot.address),
        amount: toNano(MARKETPLACE.mintingFee).toString(),
        bounce: true,
        payload: {
          abi: ROOTS.nftRoot.abi,
          method: 'mint',
          params: {
            _name: btoa(name),
            _url: btoa(url),
            _royalty: 0,
          },
        },
      });

      return { data: { message: transactionRes?.transaction?.inMessage?.hash } };
    } catch (e) {
      return { error: <any>e };
    }
  }

  async sellToken(car: ICar, price: number): Promise<IExtensionResponse> {
    try {
      const itemAccount = await this.contractsService.getTnftDataAccount(car.address);
      const userAddress = await this.getUserAddress();
      const sellRootAddress = await itemAccount.getSellRootAddress();
      const sellRootAccount = this.contractsService.getTnftSellRootAccount(
        sellRootAddress,
        ROOTS.sellRoot.abi
      );

      const transactionRes = await this.provider.sendMessage({
        sender: new Address(userAddress),
        recipient: new Address(sellRootAddress),
        amount: toNano(MARKETPLACE.offerCreationFee).toString(),
        bounce: true,
        payload: {
          abi: JSON.stringify(ROOTS.sellRoot.abi),
          method: 'deployOffer',
          params: {
            _addrRoot: await itemAccount.getNftRootAddress(),
            _addrIndex: await sellRootAccount.resolveIndex(itemAccount, userAddress),
            _addrData: await itemAccount.getAddress(),
            _price: toNano(price),
            _hash: await this.contractsService.generateHash(),
          },
        },
      });

      return { data: { message: transactionRes?.transaction?.inMessage?.hash } };
    } catch (e) {
      return { error: <IExtensionError>e };
    }
  }

  async buyToken(car:ICar): Promise<IExtensionResponse> {
    try {
      const transactionRes = await this.provider.sendMessage({
        sender: new Address(await this.getUserAddress()),
        recipient: new Address(car.offer.contractAddress),
        amount: toNano(car.offer.price).toString(),
        bounce: true,
        payload: {
          abi: JSON.stringify(ROOTS.data.abi),
          method: 'buyToken',
          params: {},
        },
      });

      return { data: { message: transactionRes?.transaction?.inMessage?.hash } };
    } catch (e) {
      return { error: <IExtensionError>e };
    }
  }

  async cancelSell(offer: IOffer): Promise<IExtensionResponse> {
    try {
      let cancelFee = toNano(MARKETPLACE.cancelOfferFee);

      const transactionRes = await this.provider.sendMessage({
        sender: new Address(await this.getUserAddress()),
        recipient: new Address(offer.contractAddress),
        amount: cancelFee.toString(),
        bounce: true,
        payload: {
          abi: offer.sellRoot.sellAbi,
          method: 'cancelOrder',
          params: {},
        },
      });

      return { data: { message: transactionRes?.transaction?.inMessage?.hash } };
    } catch (e) {
      return { error: <IExtensionError>e };
    }
  }

  private get provider(): ProviderRpcClient {
    if (this.ewClient.provider) {
      return this.ewClient.provider;
    }

    throw new Error('ProviderRpcClient not found');
  }

  private async getUserAddress(): Promise<string> {
    const userAddress = await this.ewClient.getWallet();

    if (userAddress) {
      return userAddress;
    }

    throw new Error('Address is empty');
  }
}
