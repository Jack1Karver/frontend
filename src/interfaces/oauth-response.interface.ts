import { IAuthorizedUser } from "./user.interface";

export interface IOauthResponse {
  status: string;
  user: IAuthorizedUser;
}
