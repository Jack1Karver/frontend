import { HttpMethods } from "@/config/enums/http-methods.enum"
import { apiClient } from "@/http/api-client"
import { IMark } from "@/interfaces/mark-interface"
import { IModel } from "@/interfaces/model.interface"


export class CarRequests{

     static getPopularMarks = async ()=>{
        const res =  await apiClient.send(HttpMethods.GET, '/cars/popular')

        return res.data as IMark[] ??  null
    }

    static getMarks = async ()=>{
        const res =  await apiClient.send(HttpMethods.GET, '/cars/marks')

        return res.data as IMark[] ??  null
    }

    static getModels = async (mark: string)=>{
        const res = await apiClient.send(HttpMethods.GET, `/cars/models?mark=${mark}`)

        return res.data as IModel[] ?? null
    }
}