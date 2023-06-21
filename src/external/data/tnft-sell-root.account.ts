import { AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbstractSellRootAccount } from './abstract-sell-root.account';
import { AbstractNftDataAccount } from './abstract-nft-data.account';


export class TnftSellRootAccount extends AbstractSellRootAccount {
  constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    super(contract, accountOptions);
  }

  async resolveIndex(itemAccount: AbstractNftDataAccount, ownerAddress?: string): Promise<string> {
    return (await this.account.runLocal('resolveIndex', {
      addrRoot: await itemAccount.getNftRootAddress(),
      addrData: await itemAccount.getAddress(),
      addrOwner: ownerAddress ?? await itemAccount.getOwner(),
    })).decoded?.output.addrIndex;
  }
}
