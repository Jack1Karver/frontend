import { HttpMethods } from "@/config/enums/http-methods.enum";
import { apiClient } from "@/http/api-client";
import { ICar } from "@/interfaces/car.interface";
import { TFields } from "@/interfaces/common";
import { ICarFilter } from "@/stores/filter/interfaces/car-filter.interface";
import { IFilterResponse } from "./interfaces/filter-response.interface";


export class FilterRequests{

    async fetchCars(params:TFields){
        const res = await apiClient.sendQS(HttpMethods.GET, '/filter/cars', params)

        return res.data as IFilterResponse ?? []
    }
}