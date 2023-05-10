import { engineType } from '@/config/enums/engine-type';
import { IOffer } from './offer.interface';

import { IUser } from './user.interface';
import { driveType } from '@/config/enums/drive-type';
import { gearboxType } from '@/config/enums/gearbox-type';
import { IModel } from './model.interface';

export interface ISimpleCar {
  id: string;
  files: string[];
  address?: string;
  car_features: ICarFeatures
}

export interface ICar extends ISimpleCar{
  owner: IUser;
  description: string;
  dateCreated: Date;
  status: string;
  jsonHash: string;
  offer: IOffer;
  price: number;
}

export interface ICarFeatures extends ISimpleCar {
  model: IModel;
  year_prod: number;
  engine_type: engineType;
  drive_type: driveType;
  gearbox_type: gearboxType;
  hp: number;
  engine_capacity: number;
  color: string;
  mileage: number;
}
