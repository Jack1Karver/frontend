import { apiClient } from '@/http/api-client';
import { IApiResponse } from '../interfaces/api-response.interface';
import { TFields } from '@/interfaces/common';
import { IAuthorizedUser, IUser } from '@/interfaces/user.interface';
import { HttpMethods } from '@/config/enums/http-methods.enum';

export const fetchUser = async (id: string): Promise<IUser | null> => {
  const res = await apiClient.send(HttpMethods.GET, `/user/${id}`);

  return (res.data as IUser) ?? null;
};

export const fetchAuthorizeUser = async (): Promise<IAuthorizedUser | null> => {
  const res = await apiClient.send(HttpMethods.GET, '/user');

  return (res.data as IAuthorizedUser) ?? null;
};

export const updateUserAvatar = async (data: TFields): Promise<IAuthorizedUser | null> => {
  const res = await apiClient.sendMultipart(HttpMethods.PUT, '/user/update/avatar', data);

  return (res.data as IAuthorizedUser) ?? null;
};

export const updateUserCover = async (data: TFields): Promise<IAuthorizedUser | null> => {
  const res = await apiClient.sendMultipart(HttpMethods.PUT, '/user/update/cover', data);

  return (res.data as IAuthorizedUser) ?? null;
};

export const deleteUserCover = async (): Promise<IAuthorizedUser | null> => {
  const res = await apiClient.send(HttpMethods.DELETE, '/user/delete/cover');

  return (res.data as IAuthorizedUser) ?? null;
};

export const updateUserInfo = async (data: TFields): Promise<IApiResponse> => {
  return await apiClient.sendJson(HttpMethods.PUT, '/user/update/info', data);
};

export const fetchUserByQuery = async (query: string): Promise<IUser[]> => {
  const res = await apiClient.send(HttpMethods.GET, `/user/search/${query}`);

  return (res.data as IUser[]) ?? [];
};

export const getConfirmEmailLink = async (data: TFields): Promise<IApiResponse> => {
  return await apiClient.sendJson(HttpMethods.PATCH, '/user/email/sendconfirmlink', data);
};

export const confirmEmail = async (token: string): Promise<IApiResponse> => {
  return await apiClient.send(HttpMethods.GET, `/user/email/confirm?token=${token}`);
};

export const fetchUserBySlug = async (slug: string)=>{
  const res = await apiClient.send(HttpMethods.GET, `/user/${slug}`);

  return res.data as IUser ?? null
}
