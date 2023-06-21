import { IApiResponse } from "@/interfaces/api-response.interface";


export class ResponseHandler {
  // TODO
  handleResponse(response: any): IApiResponse {
    const data = response.data;

    if (response.status >= 200 && response.status < 300) {
      return { data, status: response.status };
    }

    return { error: data, status: response.status };
  }

  handleError(err: any): IApiResponse {
    const error = err.response;

    return { error, status: err?.status ?? err.response?.status };
  }
}
