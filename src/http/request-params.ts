import { HttpMethods } from '@/config/enums/http-methods.enum';
import { TFields } from '@/interfaces/common';

export class RequestParams {
  method: HttpMethods;
  url: string;
  headers: TFields = {};
  data?: FormData | string | null;

  constructor(method: HttpMethods, endpoint: string, headers: TFields = {}) {
    this.method = method;
    this.url = endpoint;
    this.headers = headers;
  }

  toMultipart(data: TFields): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value === 'string' ||
        value instanceof Blob ||
        (value instanceof Array && value.length)
      ) {
        if (value instanceof Array) {
          value.forEach(file => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    return formData;
  }

  toJson(data: TFields): string {
    return JSON.stringify(data);
  }

  toQueryString(data: TFields): string {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(data[key]))}`)
      .join('&');
  }

  get(): RequestParams {
    return this;
  }
}
