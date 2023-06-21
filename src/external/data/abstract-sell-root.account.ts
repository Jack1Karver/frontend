
import { AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbstractAccount } from '../abstract.account';

export abstract class AbstractSellRootAccount extends AbstractAccount {
  constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    super(contract, accountOptions);
  }
}
