import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IFormRegistration } from "../interfaces/IFormRegistration";

const baseURL = import.meta.env.VITE_BASE_URL

const updateRegistration = async(data: IFormRegistration) =>{
    await axios.put<IFormRegistration>(`${baseURL}/registrations/${data.id}`, data);
}
  
export function useUpdateMutate() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: updateRegistration,
        onSuccess: () => {
            queryClient.invalidateQueries(['registrations-data'])
        }
    })

    return mutate;
}
