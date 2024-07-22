import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { Loading } from "~/components/Loading";
import { useFetch } from "~/hooks/useFetch";
import { useFormContext, Controller } from "react-hook-form";
import InputMask from 'react-input-mask'
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRegistration } from "~/hooks/useRegistration";


export const SearchBar = () => {
  const history = useHistory();
  const { control, formState: { errors } } = useFormContext()
  const [searchCpf, setSearchCpf] = useState()

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const { refetch, isLoading } = useFetch();

  const handleInputChange = (event) => {
    const {value} = event.target;

    // && !errors?.cpf
    if(value.length === 14) {
      console.log('value:', value)
      setSearchCpf(value)
      // const {data} = useRegistration(searchCpf)
      // console.log('retorno:', data)
    }

  }
  
  return (
    <S.Container>
      <Controller
        control={control}
        name={"cpf"}
        defaultValue={""}
        render={({field}) =>(
          <InputMask
          {...field}
          maskChar=""
          mask="999.999.999-99"
          onChange={(e) => {
            field.onChange(e);
            handleInputChange(e);
          }}
          >
            {(inputProps) => (
              <TextField 
                placeholder="Digite um CPF válido"
                {...inputProps}
                error={errors.cpf}

              />
            )}
          </InputMask>
      )} />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={ refetch }>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
      {isLoading && <Loading />}
    </S.Container>
  );
};
