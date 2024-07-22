import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IFormRegistration } from "~/interfaces";

const baseURL = 'http://localhost:3000/registrations'

const updateRegistration = async(data: IFormRegistration) =>{
    await axios.put<IFormRegistration>(`${baseURL}/${data.id}`, data);
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
