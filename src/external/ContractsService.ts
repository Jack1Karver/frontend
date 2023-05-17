import {
  abiContract,
  BuilderOp,
  ParamsOfSendMessage,
  ParamsOfWaitForTransaction,
  ResponseHandler,
  signerNone,
  TonClient,
} from '@tonclient/core';
import { Account, AccountOptions, ContractPackage } from '@tonclient/appkit';
import { libWeb } from '@tonclient/lib-web';
import { EVERSCALE_SERVER_ENDPOINTS } from '@/config/everscale.config';
import { TnftDataAccount } from './data/tnft-data.account';
import { TnftSellRootAccount } from './data/tnft-sell-root.account';
import { ROOTS } from '@/config/ton.config';

export default class ContractsService {
  readonly client: TonClient;

  constructor() {
    // eslint-disable-next-line
    // @ts-ignore
    TonClient.useBinaryLibrary(libWeb);

    this.client = new TonClient({
      network: {
        endpoints: EVERSCALE_SERVER_ENDPOINTS,
      },
    });
  }

  async sendMessage(params: ParamsOfSendMessage, responseHandler?: ResponseHandler) {
    return this.client.processing.send_message(params, responseHandler);
  }

  async waitForTransaction(params: ParamsOfWaitForTransaction, responseHandler?: ResponseHandler) {
    return this.client.processing.wait_for_transaction(params, responseHandler);
  }

  async encodePayload(params: Array<BuilderOp>): Promise<string> {
    return (
      await this.client.boc.encode_boc({
        builder: params,
      })
    ).boc;
  }

  async getPayloadBody({
    contract,
    function_name,
    input,
  }: {
    contract: ContractPackage;
    function_name: string;
    input: unknown;
  }): Promise<string> {
    return (
      await this.client.abi.encode_message_body({
        abi: abiContract(contract.abi),
        call_set: {
          function_name: function_name,
          input: input ?? {},
        },
        is_internal: true,
        signer: signerNone(),
      })
    ).body;
  }

  async generateHash(): Promise<string> {
    const seedPhrase = (
      await this.client.crypto.mnemonic_from_random({
        dictionary: 1,
        word_count: 12,
      })
    ).phrase;

    return (
      await this.client.crypto.sha256({
        data: btoa(seedPhrase),
      })
    ).hash;
  }

  async getMessages(msgId: string) {
    return (
      await this.client.net.query_collection({
        collection: 'messages',
        filter: {
          id: {
            eq: msgId,
          },
        },
        result: 'boc dst_transaction{out_messages{dst_transaction{out_messages{id boc}}}}',
      })
    ).result;
  }

  async fetchMessages(msgId: string, listener: (message: any) => void | Promise<void>) {
    const messages = await this.getMessages(msgId);
    const message = messages[0];
    const outMessages = message ? message.dst_transaction.out_messages : null;

    if (outMessages) {
      for (let i = 0; i < outMessages.length; i++) {
        if (outMessages[i].dst_transaction) {
          for (let k = 0; k < outMessages[i].dst_transaction.out_messages.length; k++) {
            listener(outMessages[i].dst_transaction.out_messages[k]);
          }
        }
      }
    }
  }

  async getInMessageByTransactionId(transactionId: string) {
    return (
      await this.client.net.query_collection({
        collection: 'transactions',
        filter: {
          id: {
            eq: transactionId,
          },
        },
        result: 'in_message {id}',
      })
    ).result;
  }

  
  getTnftDataAccount(address: string): TnftDataAccount {
    return new TnftDataAccount(...this.getAccountOptions(address,ROOTS.data.abi));
  }

  getTnftSellRootAccount(address: string, dataAbi: string): TnftSellRootAccount {
    return new TnftSellRootAccount(...this.getAccountOptions(address, dataAbi));
  }

  getAccountOptions(address: string, abi: string): [contract: ContractPackage, accountOptions: AccountOptions] {
    return [
      { abi: JSON.parse(abi) },
      {
        client: this.client,
        address,
      },
    ];
  }
}
