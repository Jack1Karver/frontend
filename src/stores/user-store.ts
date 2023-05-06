import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { fetchAuthorizeUser } from '@/requests/user-requests';
import { IAuthorizedUser } from '@/interfaces/user.interface';
import socketClient from '@/http/socket-client';


class UserStore {
  user: IAuthorizedUser | null = null;
  initialFetching = true;
  wallets: IWallet[] = [];

  constructor() {
    makeObservable(this, {
      user: observable,
      wallets: observable,
      initialFetching: observable,
      setUser: action,
      setInitialFetching: action,
      setWallets: action,
      isAdmin: computed,
    });

    this.setInitialUser();

    if (this.user) {
      this.subscribeWsEvents();
    } else {
      reaction(
        () => this.initialFetching,
        () => {
          this.user && this.subscribeWsEvents();
        }
      );
    }
  }

  subscribeWsEvents = () => {
    socketClient.on('user.updated', (payload: { userId: string; gbCollector: boolean }) => {
      if (this.user?.id.toString() === payload.userId) {
        this.setUser({ ...this.user, gbCollector: payload.gbCollector });
      }
    });
  };

  setInitialUser = async () => {
    const user = await fetchAuthorizeUser();

    if (user) {
      this.setUser(user);

      if (typeof window !== 'undefined') {
        // eslint-disable-next-line
        // @ts-ignore
        window.gbUserId = user._id;
      }
    }

    this.setInitialFetching(false);
  };



  setInitialFetching = (isFetching: boolean) => {
    this.initialFetching = isFetching;
  };

  setUser = (user: IAuthorizedUser | null) => {
    this.user = user;
  };

  setWallets = (wallets: IWallet[]) => {
    this.wallets = wallets;
  };

  updateUser = async () => {
    const user = await fetchAuthorizeUser();

    if (user) {
      this.setUser(user);
    }
  };



  get isAdmin() {
    return this.user?.role.includes('admin');
  }

}

export default new UserStore();

