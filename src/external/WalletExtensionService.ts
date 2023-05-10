
import { ICar } from '@/interfaces/car.interface';
import { IContractsControllerWeb } from './interfaces/contracts-controller-web.interface';
import { AbstractContractsControllerWeb } from './AbstractContractsControllerWeb';
import EverWalletControllerWeb from './EverWalletControllerWeb';
import { getEverWalletClient } from '@/utils/wallet/client';
import { WALLET_LABELS } from '@/config/labels.config';

export class WalletExtensionService implements IContractsControllerWeb<IExtensionResponse> {
  controller: AbstractContractsControllerWeb;
  errorCode: number;

  constructor() {
   
    this.controller = new EverWalletControllerWeb(getEverWalletClient());
    this.errorCode = 3;
  }

  handleResult(transactionRes: IExtensionResponse) {
    const message =
      transactionRes.error?.code === this.errorCode ? WALLET_LABELS.canceled : transactionRes.error?.message;

    if (transactionRes.error) {
      return {
        error: {
          ...transactionRes?.error,
          message,
        },
      };
    }

    return transactionRes;
  }

  mintTip4Token = async ({ json, royalty }: { json: string; royalty: number}) => {
    const transactionRes = await this.controller.mintTip4Token({ json, royalty});

    return this.handleResult(transactionRes);
  };


  putOnSale = async (car: ICar, price: number) => {
    const transactionRes = await this.controller.sellToken(car, price);

    return this.handleResult(transactionRes);
  };

  buyToken = async (car: ICar) => {
    const transactionRes = await this.controller.buyToken(car);

    return this.handleResult(transactionRes);
  };


  async cancelSell(car:ICar): Promise<IExtensionResponse> {
    const transactionRes = await this.controller.cancelSell(car.offer);

    return this.handleResult(transactionRes);
  }

  async sellToken(car: ICar, price: number): Promise<IExtensionResponse> {
    const transactionRes = await this.controller.sellToken(car, price);

    return this.handleResult(transactionRes);
  }
}
