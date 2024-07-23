import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IFormRegistration } from "~/interfaces";

const baseURL = import.meta.env.VITE_BASE_URL
    
const deleteRegistration = async(data: string) =>{
    await axios.delete<IFormRegistration>(`${baseURL}/registrations/${data}`);
}
  
export function useDeleteMutate() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: deleteRegistration,
        onSuccess: () => {
            queryClient.invalidateQueries(['registrations-data'])
        }
    })

    return mutate;
}
