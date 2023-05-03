import { reaction } from 'mobx';

import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from './local-storage.utils';
import UserStore from '@/stores/user-store'
import { IUser } from '@/interfaces/user.interface';

export const runWhenAuthorized = (action: (user: IUser) => void) => {
  if (UserStore.user) {
    action(UserStore.user);
  } else {
    reaction(
      () => !UserStore.initialFetching,
      () => {
        UserStore.user && action(UserStore.user);
      }
    );
  }
};

const LOGIN_REDIRECT_KEY = 'login_redirect_page';

export const saveLoginRedirectPage = () => {
  setLocalStorageItem(LOGIN_REDIRECT_KEY, window.location.href);
};

export const getLoginRedirectPage = (): string | null | undefined => {
  const page = getLocalStorageItem(LOGIN_REDIRECT_KEY);

  removeLocalStorageItem(LOGIN_REDIRECT_KEY);

  return page;
};
