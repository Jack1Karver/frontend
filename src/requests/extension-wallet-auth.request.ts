
import { HttpMethods } from '@/config/enums/http-methods.enum';
import { apiClient } from '@/http/api-client';
import { IApiResponse } from '@/interfaces/api-response.interface';

export class ExtensionWalletAuthRequests {
  static async getUserNonce(address: string): Promise<IApiResponse> {
    const res =  await apiClient.send(HttpMethods.GET, `/user/nonce/${address}`);
    return res
  }

  static async walletAuth({ signed, signature, address }: {
    signed: string;
    signature: string;
    address: string;
  }): Promise<IApiResponse> {
    return apiClient.sendJson(HttpMethods.POST, '/auth/extension/auth', {
      signed,
      signature,
      address,
    });
  }
}
