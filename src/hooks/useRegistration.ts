import { useQuery } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios";
import { IFormRegistration, IRegistrations } from "~/interfaces/IFormRegistration";

const baseURL = 'http://localhost:3000/registrations'

const getRegistration = async ({ searchCpf }: { searchCpf: string }) => {
    const response = await axios.get<IRegistrations>(`${baseURL}?cpf=${searchCpf}`);
    return response.data;
  };
  
  export function useRegistration(searchCpf: string) {
    const query = useQuery(['registration', searchCpf], () => getRegistration({ searchCpf }));
    return {
      ...query,
      data: query.data
    };
  }


