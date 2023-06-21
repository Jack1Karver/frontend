import { IMark } from "./mark-interface";

export interface IModel{
    id: number;
    mark: IMark;
    name: string;
    class?: string;
    year_from: number;
    year_to?: number;
}