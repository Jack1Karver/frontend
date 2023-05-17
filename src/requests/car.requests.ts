import { HttpMethods } from '@/config/enums/http-methods.enum';
import { apiClient } from '@/http/api-client';
import { ICarPrototype } from '@/interfaces/car.interface';
import { TFields } from '@/interfaces/common';
import { IMark } from '@/interfaces/mark-interface';
import { IModel } from '@/interfaces/model.interface';

export class CarRequests {
  static getPopularMarks = async () => {
    const res = await apiClient.send(HttpMethods.GET, '/cars/popular');

    return (res.data as IMark[]) ?? null;
  };

  static getMarks = async () => {
    const res = await apiClient.send(HttpMethods.GET, '/cars/marks');

    return (res.data as IMark[]) ?? null;
  };

  static getModels = async (mark: string) => {
    const res = await apiClient.send(HttpMethods.GET, `/cars/models?mark=${mark}`);

    return (res.data as IModel[]) ?? null;
  };

  static createPrototype = async (prototype: Omit<ICarPrototype, 'owner'>): Promise<ICarPrototype> => {
    const res = await apiClient.sendJson(HttpMethods.POST, `/cars`, { prototype });

    return (res.data as ICarPrototype) ?? null;
  };

  static uploadFile = async (data: TFields): Promise<ICarPrototype> => {
    const res = await apiClient.sendMultipart(HttpMethods.POST, '/cars/upload', data);

    return res.data as ICarPrototype;
  };

  static async deletePrototype(id: string){
    await apiClient.send(HttpMethods.DELETE, `/cars/delete/?id=${id}`)
  }
}
