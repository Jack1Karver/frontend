interface IExtensionResponse {
  data?: any;
  error?: IExtensionError;
}

interface IExtensionError {
  code?: number;
  data?: any;
  message?: string;
}
