

import { IWalletTransactionsService } from './interfaces/contracts-controller-web.interface';
import { WalletExtensionService } from './WalletExtensionService';
import { ICar } from '@/interfaces/car.interface';

// TODO: change return type to universal one
export class WalletTransactionService
  implements IWalletTransactionsService<IExtensionResponse > {
  walletService: WalletExtensionService;

  constructor() {
        this.walletService = new WalletExtensionService();
    }
  

  buyToken(car: ICar): Promise<IExtensionResponse> {
    return this.walletService.buyToken(car);
  }

  cancelSell(car: ICar): Promise<IExtensionResponse > {
    return this.walletService.cancelSell(car);
  }

  mintTip4Token({
    json,
    royalty,
  }: {
    json: string;
    royalty: number;
  }): Promise<IExtensionResponse > {
    return this.walletService.mintTip4Token({
      json,
      royalty
    });
  }

  sellToken(
   car: ICar,
    price: number
  ): Promise<IExtensionResponse> {
    return this.walletService.sellToken(car, price);
  }
}
