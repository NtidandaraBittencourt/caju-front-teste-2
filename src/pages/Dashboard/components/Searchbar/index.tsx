import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { Loading } from "~/components/Loading";
import { useFormContext, Controller } from "react-hook-form";
import InputMask from 'react-input-mask';
import { useState, useEffect } from "react";
import { useRegistration } from "~/hooks/useRegistration";

type Props = {
  onSearch: (cpf: string, data: any) => void;
  onRefresh: () => void;
}

export const SearchBar = ({ onSearch, onRefresh }: Props) => {
  const history = useHistory();
  const { control, formState: { errors } } = useFormContext();
  const [searchCpf, setSearchCpf] = useState("");

  const { data, refetch, isLoading } = useRegistration(searchCpf);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.length === 14) {
      setSearchCpf(value);
    }
  };

  useEffect(() => {
    if (searchCpf.length === 14) {
      refetch();
    }
  }, [searchCpf, refetch]);

  useEffect(() => {
    if (data) {
      onSearch(searchCpf, data);     
    }
  }, [data, onSearch, searchCpf]);

  const handleRefresh = () => {
    setSearchCpf("");
    onRefresh();
  };

  return (
    <S.Container>
      <Controller
        control={control}
        name={"cpf"}
        defaultValue={""}
        render={({ field }) => (
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
        )}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
      {isLoading && <Loading />}
    </S.Container>
  );
};
