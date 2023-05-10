import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

import { MARKETPLACE } from '@/config/marketplace.config';
import { toNano } from '@/utils/contract.utils';
import { AbstractContractsControllerWeb } from './AbstractContractsControllerWeb';
import EverWalletClient from '@/utils/wallet/EverWalletClient';
import { ICar } from '@/interfaces/car.interface';
import { IOffer } from '@/interfaces/offer.interface';

export default class EverWalletControllerWeb extends AbstractContractsControllerWeb {
  readonly ewClient: EverWalletClient;

  constructor(ewClient: EverWalletClient) {
    super();
    this.ewClient = ewClient;
  }

  async mintTip4Token({
    json,
    royalty,
  }: {
    json: string;
    royalty: number;
  }): Promise<IExtensionResponse> {
    try {
      const userAddress = await this.getUserAddress();

      const transactionRes = await this.provider.sendMessage({
        sender: new Address(userAddress),
        recipient: new Address(collection.nftRoot.address),
        amount: toNano(MARKETPLACE.mintingFeeTip4).toString(),
        bounce: true,
        payload: {
          abi: collection.nftRoot.rootAbi,
          method: 'mint',
          params: {
            json,
            royalty: [[userAddress, royalty]],
          },
        },
      });

      return { data: { message: transactionRes?.transaction?.inMessage?.hash } };
    } catch (e) {
      return { error: <IExtensionError>e };
    }
  }


  async sellToken(car: ICar, price: number): Promise<IExtensionResponse> {
    try {
      const itemAccount = await this.contractsService.getTip4DataAccount(car.address, getDataAbiFromItem(car));
      const userAddress = await this.getUserAddress();
      const itemAddress = await itemAccount.getAddress();
      const sellRoot = getSellRootFromItem(car);
      const sellContract = await this.contractsService.getTip4SellRootAccount(sellRoot.address, sellRoot.rootAbi);
      const sellPayload = await sellContract.generatePayload(price, car.collection.nftRoot.address);

      const payload = {
        abi: JSON.stringify(itemAccount.abi),
        method: 'changeManager',
        params: {
          newManager: sellRoot.address,
          sendGasTo: userAddress,
          callbacks: [
            [
              sellRoot.address,
              {
                value: toNano(MARKETPLACE.offerCreationFee).toString(),
                payload: sellPayload,
              },
            ],
          ],
        },
      };

      const transactionRes = await this.provider.sendMessage({
        sender: new Address(userAddress),
        recipient: new Address(itemAddress),
        amount: toNano(MARKETPLACE.changeManagerFee).toString(),
        bounce: true,
        payload,
      });

      return { data: { message: transactionRes?.transaction?.inMessage?.hash } };
    } catch (e) {
      console.error(e);
      return { error: <IExtensionError>e };
    }
  }


  async buyToken(car: ICar): Promise<IExtensionResponse> {
    try {
      const transactionRes = await this.provider.sendMessage({
        sender: new Address(await this.getUserAddress()),
        recipient: new Address(car.offer.contractAddress),
        amount: toNano(car.offer.price).toString(),
        bounce: true,
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
