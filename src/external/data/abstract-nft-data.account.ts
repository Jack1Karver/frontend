import { AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbstractAccount } from '../abstract.account';


export abstract class AbstractNftDataAccount extends AbstractAccount {
  constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    super(contract, accountOptions);
  }

  abstract getOwner(): Promise<string>;

  abstract getAllowance(): Promise<string | null>;

  abstract getRoyalty(): Promise<number>;

  abstract getNftRootAddress(): Promise<string>;
}
