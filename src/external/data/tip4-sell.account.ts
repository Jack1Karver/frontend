import { AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbstractSellRootAccount } from './abstract-sell-root.account';

export class Tip4SellAccount extends AbstractSellRootAccount {
  constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    super(contract, accountOptions);
  }

  async getCancelPrice(): Promise<number> {
    return (
      await this.account.runLocal('getFeesInfo', {
        answerId: 0,
      })
    )?.decoded?.output?.cancelSellPrice;
  }
}
