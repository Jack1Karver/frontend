import { engineType } from '@/config/enums/engine-type';
import { IOffer } from './offer.interface';

import { IUser } from './user.interface';
import { driveType } from '@/config/enums/drive-type';
import { gearboxType } from '@/config/enums/gearbox-type';
import { IModel } from './model.interface';

export interface ISimpleCar {
  id: string;
  files: string[];
  address: string;
  carFeatures: ICarFeatures;
}

export interface ICar extends ISimpleCar {
  owner: IUser;
  description: string;
  dateCreated: Date;
  status: string;
  jsonHash: string;
  offer: IOffer;
}

export interface ICarFeatures {
  model: IModel;
  yearProd: number;
  engineType: engineType;
  driveType: driveType;
  gearboxType: gearboxType;
  hp: number;
  engineCapacity: number;
  color: string;
  mileage: number;
}

export interface ICarPrototype {
  id?: string;
  owner: IUser;
  carFeatures: ICarFeatures;
  description: string;
  files?: File[];
}
