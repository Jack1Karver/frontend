import everWalletStore from "@/stores/ever-wallet-store";
import EverWalletClient from "./EverWalletClient";
import { getExtensionClient } from "./extension";
import { WALLET_LABELS } from "@/config/labels.config";


export function getEverWalletClient(): EverWalletClient {
  return getExtensionClient(everWalletStore.client, WALLET_LABELS.everwalletNotConnected);
}
