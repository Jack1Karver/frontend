import Router from 'next/router';

import { notify } from '../common.utils';

export function getExtensionClient<T extends IExtensionClient>(client: T | null, errorMessage: string): T {
  if (!client) {
    if (typeof window !== 'undefined') {
      notify(errorMessage);
      throw Error(errorMessage);
    }

    throw Error(errorMessage);
  }

  return client;
}
