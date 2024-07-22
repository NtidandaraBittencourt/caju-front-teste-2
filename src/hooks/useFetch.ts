import { useQuery } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios";
import { IRegistrations } from "~/interfaces";

const baseURL = 'http://localhost:3000'

const fetchData = async(): AxiosPromise<IRegistrations> =>{
    const response = await axios.get<IRegistrations>(baseURL + '/registrations');
    return response
} 

export function useFetch() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['registrations-data']
    })
    return {
        ...query,
        data: query.data?.data
    }
}


