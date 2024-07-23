import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IRegistrations } from "../interfaces/IFormRegistration";

const baseURL = import.meta.env.VITE_BASE_URL

const getRegistration = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, searchCpf] = queryKey;
  const response = await axios.get<IRegistrations>(`${baseURL}/registrations?cpf=${searchCpf}`);
  return response.data;
};

export function useRegistration(searchCpf: string) {
  return useQuery({
    queryKey: ['registration', searchCpf],
    queryFn: getRegistration,
    enabled: !!searchCpf,
  });
}
