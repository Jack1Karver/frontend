import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { hasEverscaleProvider } from 'everscale-inpage-provider';

import UserStore from './user-store';
import EverWalletClient from '@/utils/wallet/EverWalletClient';
import { ConnectedStatus } from '@/config/connected-status.enum';

class EverWalletStore implements IExtensionStore {
  client: EverWalletClient | null = null;
  isProperNetwork = false;
  isAvailable = false;
  address = '';
  profileWalletAddress = '';
  connectedStatus: ConnectedStatus = ConnectedStatus.Unavailable;

  constructor() {
    makeObservable(this, {
      client: observable,
      isProperNetwork: observable,
      isAvailable: observable,
      address: observable,
      profileWalletAddress: observable,
      connectedStatus: observable,
      setAddress: action,
      setClient: action,
      setIsProperNetwork: action,
      setIsAvailable: action,
      setProfileWalletAddress: action,
      setConnectedStatus: action,
      isConnected: computed,
    });

    this.setClient();

    autorun(async () => {
      if (!this.client) {
        await this.setClient();
      }

      if (this.client) {
        this.setIsAvailable(true);
        this.setWalletParameters();
      }
        this.connectWallet();
    });
  }

  setClient = async (): Promise<void> => {
    const isAvailable = await hasEverscaleProvider();

    if (isAvailable && typeof document !== 'undefined') {
      this.client = new EverWalletClient();

      this.client?.subscribeNetworkChanged(() => {
        this.setWalletParameters();
        this.updateConnectedStatus();
      });

      this.client?.subscribeLogOut(() => {
        this.setWalletParameters();
        this.updateConnectedStatus();
      });

      this.client?.subscribeDisconnect(() => {
        this.setWalletParameters();
        this.updateConnectedStatus();
      });
    }
  };

  connectWallet = () => {
    if (this.client) {
      this.client.getWallet().then(address => address && this.setAddress(address));

      this.updateConnectedStatus();
    }

    if (UserStore.user) {
      this.setProfileWalletAddress(UserStore.user?.wallet?.address ?? '');
    }
  };

  setIsProperNetwork = (isProperNetwork: boolean) => {
    this.isProperNetwork = isProperNetwork;
  };

  setAddress = (address: string) => {
    this.address = address;
  };

  setIsAvailable = (isAvailable: boolean) => {
    this.isAvailable = isAvailable;
  };

  setWalletParameters = () => {
    if (this.client) {
      this.client.isProperNetwork().then(isProperNetwork => this.setIsProperNetwork(!!isProperNetwork));
    }
  };

  setProfileWalletAddress = (address: string) => {
    this.profileWalletAddress = address;
  };

  disconnect = async (): Promise<void> => {
    if (this.client) {
      await this.client.disconnect();
    }
  };

  setConnectedStatus = (status: ConnectedStatus) => {
    this.connectedStatus = status;
  };

  updateConnectedStatus = () => {
    if (this.address && !this.isProperNetwork) {
      this.setConnectedStatus(ConnectedStatus.WrongNetwork);
    } else if (
      this.address &&
      this.isProperNetwork &&
      this.profileWalletAddress &&
      this.address === this.profileWalletAddress
    ) {
      this.setConnectedStatus(ConnectedStatus.Connected);
    } else if (
      this.address &&
      this.isProperNetwork &&
      this.profileWalletAddress &&
      this.address !== this.profileWalletAddress
    ) {
      this.setConnectedStatus(ConnectedStatus.WrongWallet);
    } else if (this.address && this.isProperNetwork) {
      this.setConnectedStatus(ConnectedStatus.Disconnected);
    } else {
      this.setConnectedStatus(ConnectedStatus.Unavailable);
    }
  };

  get isConnected() {
    return (
      this.connectedStatus === ConnectedStatus.Connected
    );
  }

  get isConnectError() {
    return (
      this.connectedStatus !== ConnectedStatus.Connected
    );
  }
}

export default new EverWalletStore();
