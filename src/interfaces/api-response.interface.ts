export interface IApiResponse {
  data?: unknown;
  error?: ResponseError;
  status: number;
}

type ResponseError = {
  data: {
    statusCode: number,
    message?: string,
    error?: string
    errors?: {[key: string]: string}
  },
  status: number
}
