import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IFormRegistration } from "~/interfaces";

const baseURL = import.meta.env.VITE_BASE_URL

const postRegistrations = async(data: IFormRegistration) => {
    return await axios.post(baseURL + '/registrations', data)
}

export function useRegistrationMutate(){
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: postRegistrations,   
        onSuccess: () => {
            queryClient.invalidateQueries(['registrations-data'])
        }
    })
    return mutate
}
