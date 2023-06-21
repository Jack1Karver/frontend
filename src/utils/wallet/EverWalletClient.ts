import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EVERSCALE_NETWORK } from '@/config/everscale.config';
import { EverConnect } from './EverConnect';
import { getLoginRedirectPage } from '../authorization.utils';
import DealerEvent from '../events.utils';
import { ExtensionWalletAuthRequests } from '@/requests/extension-wallet-auth.request';
import { IOauthResponse } from '@/interfaces/oauth-response.interface';
import { networksEnum } from '@/config/enums/networks.enum';

export default class EverWalletClient implements IExtensionClient {
  provider: ProviderRpcClient | null = null;

  constructor() {
    this.provider = new ProviderRpcClient();
  }

  async isProperNetwork(): Promise<boolean> {
    const currentNetwork = (await this.getProvider().getProviderState()).selectedConnection;

    return (
      (currentNetwork === networksEnum.testNet && EVERSCALE_NETWORK === networksEnum.devNet) ||
      currentNetwork === EVERSCALE_NETWORK
    );
  }

  async ensureIsProperNetwork(): Promise<void> {
    if (!(await this.isProperNetwork())) throw new Error('Wrong network');
  }

  // TODO: move to auth class
  async auth(): Promise<'account_error' | void> {
    await this.disconnect();

    if (!this.provider) {
      throw new Error('Extension is not installed');
    }

    await this.provider.ensureInitialized();
    // TODO: handle network error
    await this.ensureIsProperNetwork();

    const { accountInteraction } = await this.provider.requestPermissions({
      permissions: ['basic', 'accountInteraction'],
    });

    if (accountInteraction == null) {
      throw new Error('Insufficient permissions');
    }

    const userAddress = accountInteraction.address.toString();

    if (!(await this.provider.getFullContractState({ address: accountInteraction.address })).state?.isDeployed) {
      console.log('account_not_deployed')
      throw new Error('account_not_deployed');
    }
    const nonceResponse = await ExtensionWalletAuthRequests.getUserNonce(userAddress);

    if (!nonceResponse.data) {
      throw new Error('account_error');
    }

    const nonce = <string>nonceResponse.data;

    const signedData = await this.provider.signDataRaw({
      data: btoa(nonce),
      publicKey: accountInteraction.publicKey,
    });

    const response = await ExtensionWalletAuthRequests.walletAuth({
      // TODO: is it ok to add word?
      signed: btoa(atob(signedData.signature) + nonce),
      signature: accountInteraction.publicKey,
      address: userAddress,
    });
    const data = (response.data as IOauthResponse) ?? null;

    if (response.status == 201) {
      if (data.status === 'new') {
        DealerEvent.registrationEvent();
      }

      if(typeof window !== 'undefined'){
      }

      EverConnect.setMethod(data.user.memo);
      const loginRedirectPage = getLoginRedirectPage();
      // window.location.href = loginRedirectPage ?? `/user/${data.user.slug}`;
    }
  }

  async subscribeNetworkChanged(callback: (network: string) => void): Promise<void> {
    if (this.provider) {
      this.provider.subscribe('networkChanged').then(subcribe =>
        subcribe.on('data', data => {
          callback(data.selectedConnection);
        })
      );
    }
  }

  async subscribeLogOut(callback: () => void): Promise<void> {
    if (this.provider) {
      this.provider.subscribe('loggedOut').then(subcribe =>
        subcribe.on('data', () => {
          callback();
        })
      );
    }
  }

  async subscribeDisconnect(callback: () => void): Promise<void> {
    if (this.provider) {
      this.provider.subscribe('disconnected').then(subcribe =>
        subcribe.on('data', () => {
          callback();
        })
      );
    }
  }

  async disconnect(): Promise<void> {
    if (this.provider) {
      await this.provider.disconnect();
    }
  }

  async getWallet(): Promise<string | undefined> {
    if (this.provider) {
      const { accountInteraction } = await this.provider.requestPermissions({
        permissions: ['basic', 'accountInteraction'],
      });

      if (accountInteraction == null) {
        throw new Error('Insufficient permissions');
      }

      return accountInteraction.address.toString();
    }
  }

  async transfer(addrTo: string, price: number, bounce: boolean) {
    const userAddress = await this.getWallet();

    if (this.provider && userAddress) {
      return this.provider.sendMessage({
        sender: new Address(userAddress),
        recipient: new Address(addrTo),
        amount: price.toString(),
        bounce,
      });
    }
  }

  private getProvider(): ProviderRpcClient {
    if (this.provider) {
      return this.provider;
    }

    throw Error('Ever Wallet provider is not defined');
  }
}
