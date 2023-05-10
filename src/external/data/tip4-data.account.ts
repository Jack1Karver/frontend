import { AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbstractNftDataAccount } from './abstract-nft-data.account';
import { ITip4ItemInfo } from '../interfaces/tip4-item-info.interface';


export class Tip4DataAccount extends AbstractNftDataAccount {
  constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    super(contract, accountOptions);
  }

  async getInfo(): Promise<ITip4ItemInfo> {
    return (await this.account.runLocal('getInfo', { answerId: 0 })).decoded?.output;
  }

  async getOwner(): Promise<string> {
    return (await this.getInfo()).owner;
  }

  async getAllowance(): Promise<string | null> {
    const itemInfo = await this.getInfo();

    return itemInfo.manager !== itemInfo.owner ? itemInfo.manager : null;
  }

  async getNftRootAddress(): Promise<string> {
    return (await this.getInfo()).collection;
  }

  async getRoyalty(): Promise<number> {
    const royalties = (await this.account.runLocal('royaltyInfo', { answerId: 0 })).decoded?.output?.royalty;
    const royalty = Object.values(royalties)[0] as string;

    return +royalty;
  }

  async getJson() {
    return (await this.account.runLocal('getJson', { answerId: 0 })).decoded?.output.json;
  }
}
