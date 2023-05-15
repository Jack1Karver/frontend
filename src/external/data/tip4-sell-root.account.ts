import { AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbstractSellRootAccount } from './abstract-sell-root.account';
import { toNano } from '@/utils/contract.utils';


export class Tip4SellRootAccount extends AbstractSellRootAccount {
  constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    super(contract, accountOptions);
  }

  async generatePayload(price: number, collection: string) {
    return (
      await this.account.runLocal('generatePayload', {
        answerId: 0,
        price: toNano(price),
      })
    )?.decoded?.output.payload;
  }

  async getTotalCreationPrice(): Promise<number | null> {
    try {
      return (
        await this.account.runLocal('getFeesInfo', {
          answerId: 0,
        })
      )?.decoded?.output?.totalDeploymentPrice;
    } catch (e) {
      return null;
    }
  }
}
