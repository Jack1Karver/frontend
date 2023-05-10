import { Account, AccountOptions, ContractPackage } from '@tonclient/appkit';
import { AbiContract, TonClient } from '@tonclient/core';

export abstract class AbstractAccount {
  protected readonly account: Account;
  protected readonly client: TonClient | undefined;
  readonly abi: AbiContract;

  protected constructor(contract: ContractPackage, accountOptions: AccountOptions) {
    this.client = accountOptions.client;
    this.account = new Account(<ContractPackage>(<unknown>contract), {
      client: accountOptions.client,
      address: accountOptions.address,
      signer: accountOptions.signer,
    });
    this.abi = contract.abi;
  }

  public async getAccountType(): Promise<number> {
    return (await this.account.getAccount()).acc_type;
  }

  public async getAddress(): Promise<string> {
    return this.account.getAddress();
  }

  public async getBalance(): Promise<string> {
    return this.account.getBalance();
  }

  public decodeMessage(message: string): Promise<any> {
    return this.account.decodeMessage(message);
  }
}
