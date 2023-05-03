import axios from 'axios';

import { ResponseHandler } from '@/requests/response-handler';
import { HttpMethods } from '@/config/enums/http-methods.enum';
import { IApiResponse } from '@/interfaces/api-response.interface';
import { TFields } from '@/interfaces/common';
import { RequestParams } from './request-params';

export class AxiosClient {
  private responseHandler: ResponseHandler;
  apiUrl: string;
  // TODO fix
  // if remove this we get a user from the cache when he does not have a token
  options;
  cookies: TFields = {};

  constructor(apiUrl = '', options = {}, cookies: Record<string, string> = {}) {
    this.apiUrl = apiUrl;
    this.options = options;
    this.responseHandler = new ResponseHandler();
  }

  async sendMultipart(method: HttpMethods, endpoint: string, data: TFields): Promise<IApiResponse> {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const requestParams = new RequestParams(method, this.apiUrl + endpoint);
    requestParams.data = requestParams.toMultipart(data);

    return this.__send(requestParams.get());
  }

  async sendJson(method: HttpMethods, endpoint: string, data: TFields): Promise<IApiResponse> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const requestParams = new RequestParams(method, this.apiUrl + endpoint);
    requestParams.data = data

    return this.__send(requestParams.get());
  }

  async sendQS(method: HttpMethods, endpoint: string, data: TFields): Promise<IApiResponse> {
    const requestParams = new RequestParams(method, this.apiUrl + endpoint);
    const qs = requestParams.toQueryString(data);

    requestParams.url = `${requestParams.url}?${qs}`;

    return await this.__send(requestParams.get());
  }

  async send(method: HttpMethods, endpoint: string): Promise<IApiResponse> {
    const requestParams = new RequestParams(method, this.apiUrl + endpoint);

    return  this.__send(requestParams.get());
  }

  async __send(requestParams: RequestParams): Promise<IApiResponse> {
    try {
      return this.responseHandler.handleResponse(
        await axios({ ...requestParams, withCredentials: true, ...this.options })
      );
    } catch (e) {
      return this.responseHandler.handleError(e);
    }
  }
}
