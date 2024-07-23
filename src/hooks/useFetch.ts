import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { IRegistrations } from "~/interfaces";

const baseURL = import.meta.env.VITE_BASE_URL

const fetchData = async(): Promise<IRegistrations> =>{
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


