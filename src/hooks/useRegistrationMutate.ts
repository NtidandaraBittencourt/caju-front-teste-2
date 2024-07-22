import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IFormRegistration } from "~/interfaces";

const baseURL = 'http://localhost:3000/registrations'

const postRegistrations = async(data: IFormRegistration) => {
    return await axios.post(baseURL, data)
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
