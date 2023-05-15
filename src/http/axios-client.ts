import { HttpMethods } from '@/config/enums/http-methods.enum';
import { IApiResponse } from '@/interfaces/api-response.interface';
import { TFields } from '@/interfaces/common';
import { ResponseHandler } from '@/requests/response-handler';
import axios from 'axios';
import { RequestParams } from './request-params';


export class AxiosClient {
  private responseHandler: ResponseHandler;
  apiUrl: string;
  // TODO fix
  // if remove this we get a user from the cache when he does not have a token
  headers: TFields = { 'Cache-Control': 'no-cache' };
  options;

  constructor(apiUrl = '', options = {}, cookies: Record<string, string> = {}) {
    this.apiUrl = apiUrl;
    this.options = options;
    this.responseHandler = new ResponseHandler();

    if (Object.keys(cookies)?.length) {
      this.headers.Cookie = Object.entries(cookies).reduce((acc, [key, value]) => `${acc}${key}=${value};`, '');
    }
  }

  async sendMultipart(method: HttpMethods, endpoint: string, data: TFields): Promise<IApiResponse> {
    const headers = {
      ...this.headers,
      'Content-Type': 'multipart/form-data',
    };

    const requestParams = new RequestParams(method, this.apiUrl + endpoint, headers);
    requestParams.data = requestParams.toMultipart(data);
    console.log(requestParams.data)

    return this.__send(requestParams.get());
  }

  async sendJson(method: HttpMethods, endpoint: string, data: TFields): Promise<IApiResponse> {
    const headers = {
      ...this.headers,
      'Content-Type': 'application/json',
    };

    const requestParams = new RequestParams(method, this.apiUrl + endpoint, headers);
    requestParams.data = requestParams.toJson(data);

    return this.__send(requestParams.get());
  }

  async sendQS(method: HttpMethods, endpoint: string, data: TFields): Promise<IApiResponse> {
    const requestParams = new RequestParams(method, this.apiUrl + endpoint, this.headers);
    const qs = requestParams.toQueryString(data);

    requestParams.url = `${requestParams.url}?${qs}`;

    return this.__send(requestParams.get());
  }

  async send(method: HttpMethods, endpoint: string): Promise<IApiResponse> {
    const requestParams = new RequestParams(method, this.apiUrl + endpoint, this.headers);

    return this.__send(requestParams.get());
  }

  async __send(requestParams: RequestParams): Promise<IApiResponse> {
    try {
      return this.responseHandler.handleResponse(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await axios({ ...requestParams, withCredentials: true, ...this.options })
      );
    } catch (e) {
      return this.responseHandler.handleError(e);
    }
  }
}
