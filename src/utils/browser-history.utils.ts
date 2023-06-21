import Router from 'next/router';

import { removeEmptyParams } from './common.utils';

export const setSearchParams = async (params: Record<string, string | null>, force = false) => {
  if (typeof window === 'undefined') {
    return;
  }

  let search = {};

  // save query param for pages like /user/[userId]
  // otherwise userId is null when switch to the tabs
  const defaultQueryParams = Router.pathname.match(/\[(\w+)]/);

  if (defaultQueryParams && defaultQueryParams[1]) {
    const paramName = defaultQueryParams[1];

    if (Router.query[paramName]) {
      search = { ...search, [paramName]: Router.query[paramName] };
    }
  }

  if (!force) {
    Object.entries(Router.query).forEach(([paramName, paramValue]) => {
      search = { ...search, [paramName]: paramValue };
    });
  }

  for (const [paramName, paramValue] of Object.entries(params)) {
    search = { ...search, [paramName]: paramValue };
  }

  search = removeEmptyParams(search);

  await Router.replace(
    {
      pathname: Router.pathname,
      query: search,
    },
    '',
    { scroll: false }
  );
};

export const clearSearchParams = async () => {
  await Router.replace(
    {
      query: '',
    },
    '',
    { scroll: false }
  );
};

export const getSearchParams = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
};
