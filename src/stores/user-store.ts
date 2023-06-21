import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { fetchAuthorizeUser } from '@/requests/user-requests';
import { IAuthorizedUser } from '@/interfaces/user.interface';


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

  }

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

