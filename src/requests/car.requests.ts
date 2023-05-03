import { HttpMethods } from "@/config/enums/http-methods.enum"
import { apiClient } from "@/http/api-client"
import { IMark } from "@/models/mark.model"


export class CarRequests{

     static getPopularMarks = async ()=>{
        const res =  await apiClient.send(HttpMethods.GET, '/cars/popular')

        return res.data as IMark[] ??  null
    }
}