

export class EverConnect {
  static EVER_CONNECT_KEY = 'ever-connect';

  static setMethod = ( userMemo: string) => {
    const method = 'everwallet'
    localStorage.setItem(
      EverConnect.EVER_CONNECT_KEY,
      JSON.stringify({
        method,
        userMemo,
      })
    );
  };

  static getMethod = (): { userMemo: string } | null => {
    const connectMethod = localStorage.getItem(EverConnect.EVER_CONNECT_KEY);

    return connectMethod ? JSON.parse(connectMethod) : null;
  };

  static clear = () => {
    localStorage.removeItem(EverConnect.EVER_CONNECT_KEY);
  };
}
