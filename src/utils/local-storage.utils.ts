export const setLocalStorageItem = (name: string, value: string) => {
  window.localStorage.setItem(name, value);
};

export const removeLocalStorageItem = (name: string) => {
  window.localStorage.removeItem(name);
};

export const getLocalStorageItem = (name: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(name);
  }
};
