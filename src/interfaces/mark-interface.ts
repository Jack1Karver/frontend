import { ICountry } from "./country.interface";

export interface IMark {
    id: number;
    name: string;
    popular: boolean;
    country: ICountry;
  }
  