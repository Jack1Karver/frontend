import EverWalletClient from "./EverWalletClient";


export function getEverWalletClient(): EverWalletClient {
  return getExtensionClient(EverWalletStore.client, WALLET_LABELS.everwalletNotConnected);
}

export function getExtratonClient(): ExtratonClient {
  return getExtensionClient(ExtratonStore.client, WALLET_LABELS.extratonNotConnected);
}
