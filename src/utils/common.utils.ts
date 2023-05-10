import { VALID_NUMBER_REGEX } from '@/config/regex.config';
import { TFields } from '@/interfaces/common';
import crypto from 'crypto';
import { toast } from 'react-toastify';

export const stripAddress = (address: string, start = 4, end = 4): string =>
  address.substring(0, start) + ' .... ' + address.substr(address.length - end);

export const createHash = (str: string): string =>
  crypto.createHash('sha256').update(str).digest('hex').substring(0, 20);

export const notify = (message: string): void => {
  toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 5000,
    pauseOnFocusLoss: false,
  });
};

export const validNumberField = (value: string): boolean => {
  if (!value) {
    return true;
  }

  return Boolean(value.match(VALID_NUMBER_REGEX));
};

export const formatDate = (date: Date): string => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatNumber = (number: number | string) => {
  return (+(+number).toFixed(1)).toLocaleString('en-US');
};

export const removeEmptyParams = (params: TFields) =>
  Object.entries(params).reduce((fields, [key, value]) => (value ? { ...fields, [key]: value } : fields), {});

export const removeNullParams = (params: TFields) =>
  Object.entries(params).reduce((fields, [key, value]) => (value !== null ? { ...fields, [key]: value } : fields), {});

export const paramsToSearch = (params: TFields) =>
  Object.entries(params).reduce((fields, [key, value]) => ({ ...fields, [key]: value ? String(value) : null }), {});

export const getNowIsoString = (): string => new Date().toISOString();

export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(item => (item[0] ? item[0].toUpperCase() : ''))
    .join('');

export const splitIntoParagraphs = (text: string): string[] => {
  let paragraphs: string[] = [];

  if (text) {
    paragraphs = text.split('\n');
    paragraphs = paragraphs.filter(item => {
      if (item.length && !/^[\s\t]+$/.test(item)) {
        return item;
      }
    });
  }

  return text ? paragraphs : [];
};

export const removeParagraphs = (text: string): string => (text ? text.replaceAll('\n', ' ') : '');

export const cropText = (text: string, count: number): string => {
  if (!text || text?.length <= count) {
    return text;
  }

  const words = text.substr(0, count).split(' ');

  return words.slice(0, words.length - 1).join(' ') + '...';
};

export const cropName = (name: string, count: number): string => {
  if (!name || name?.length <= count) {
    return name;
  }

  const toCrop = name.substr(0, count).split('');

  return toCrop.slice(0, toCrop.length).join('') + '...';
};

export const formatNumberWithLetter = (amount: number | string): string => {
  if (!amount) {
    return '0';
  }

  const likes = [
    { min: -1, max: 1000, divider: 1, label: ' ' },
    { min: 999, max: 1000000, divider: 1000, label: 'K' },
    { min: 999999, max: 1000000000, divider: 1000000, label: 'M' },
    { min: 999999999, max: 10000000001, divider: 1000000000, label: 'B' },
  ];

  const likeAmountProperties = likes.find(item => {
    return +amount > item.min && +amount < item.max;
  });

  amount = Number(+amount / (likeAmountProperties?.divider ?? 1)).toFixed(1);

  return `${(+amount).toLocaleString('en-US')}${likeAmountProperties?.label}`;
};

export const trimSocialLink = (link: string): string => {
  return link.trim().replace(/[/@#&\s]/g, '');
};

export const sprintf = (str: string, ...args: Array<string | number>): string => {
  let i = 0;

  while (i < args.length) {
    str = str.replace('%s', args[i].toString());
    i++;
  }

  return str;
};

export const getPathWithoutParams = (path: string): string => path.split('?')[0];

export const toMb = (size: number): number => Math.ceil((size / (1024 * 1024)) * 100) / 100;

export const toKb = (size: number): number => Math.ceil((size / 1024) * 100) / 100;

export const isNumber = (val: any): boolean => typeof val === 'number';

export const declOfNum = (number: number, words: string[], printNum = false): string => {
  return `${printNum ? `${number} ` : ''}${
    words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]]
  }`;
};

export const withClassNames = (classNames: string[]): string => {
  return classNames.join(' ');
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function shallowEqual(object1: object, object2: object): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key as keyof object] !== object2[key as keyof object]) {
      return false;
    }
  }

  return true;
}

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number | null = null;

  return function (this: any, ...args: any[]) {
    timeoutID && clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export function createKeysFromInterface<Interface>(keyRecord: Record<keyof Interface, any>): (keyof Interface)[] {
  return Object.keys(keyRecord) as (keyof Interface)[];
}

export function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (result.length < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
