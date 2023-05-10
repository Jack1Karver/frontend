import { EVERSCALE_ADDRESS_REGEX, ONLY_ZERO, PUBKEY_REGEX } from '@/config/regex.config';
import { builderOpBitString, builderOpInteger } from '@tonclient/core';



// String -> String
export const strip0x = (str: string) => str.replace(/^0x/, '');
export const add0x = (str: string) => (str === '' ? '' : `0x${strip0x(str)}`);
export const stripWorkchain = (str: string) => str.replace(/^[^:]*:/, '');

// * -> Bool
export const isValidPublicKey = (x: any) =>
  typeof x === 'string' && PUBKEY_REGEX.test(strip0x(x)) && !ONLY_ZERO.test(strip0x(x));
export const isValidAddress = (x: any) =>
  typeof x === 'string' && EVERSCALE_ADDRESS_REGEX.test(x) && !ONLY_ZERO.test(stripWorkchain(x));

// String|Number, String|Number -> Bool
export const isNear = (x: string | number, y: string | number) =>
  Math.abs(parseInt(y.toString()) - parseInt(x.toString())) < 200000000; // 2e8

export const toNano = (n: number) => n * 1000000000; // 1e9
export const fromNano = (n: number) => n / 1000000000;

export const toDecimals = (n: number, d: number): number => {
  return n * Math.pow(10, d);
};

export const fromDecimals = (n: number, d: number): number => {
  return n / Math.pow(10, d);
};

export const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

export const hexEncode = (string: string): string => {
  let hex, i;

  let result = '';
  for (i = 0; i < string.length; i++) {
    hex = string.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
};

export const hexDecode = (string: string): string => {
  const hexes = string.match(/.{1,4}/g) || [];
  let back = '';
  for (let j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

export const u = (size: number, x: string | number | bigint | boolean) => {
  if (size === 256) {
    return builderOpBitString(`x${BigInt(x).toString(16).padStart(64, '0')}`);
  } else {
    return builderOpInteger(size, x);
  }
};

export const u8 = (x: string | number | bigint | boolean) => u(8, x);
export const u32 = (x: string | number | bigint | boolean) => u(32, x);
export const u128 = (x: string | number | bigint | boolean) => u(128, x);
export const u256 = (x: string | number | bigint | boolean) => u(256, x);

export const dynamicImportExtensionService = async (
  walletType: 'everwallet'
) =>
  Promise.resolve()
    .then(function () {
      return import('@/external/WalletExtensionService');
    })
    .then(function (walletExtService) {
      return new walletExtService.WalletExtensionService();
    });

export const dynamicImportContractsService = async () =>
  Promise.resolve()
    .then(function () {
      return import('@/external/ContractsService');
    })
    .then(function (contractsService) {
      return new contractsService.default();
    });

export const dynamicImportWalletsService = async () =>
  Promise.resolve()
    .then(function () {
      return import('@/external/WalletTransactionService');
    })
    .then(function (contractsService) {
      return new contractsService.WalletTransactionService();
    });
