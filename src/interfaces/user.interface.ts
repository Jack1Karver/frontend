export interface IUser {
  id: string;
  slug: string;
  wallet: IWallet;
  name: string;
  bio?: string;
}

export interface IAuthorizedUser extends IUser {
  role: string;
  email?: string;
  nonce: string;
  memo: string;
  status?: string;
  notificationEmail?: {
    email: string;
    isConfirmed: boolean;
  };
}



