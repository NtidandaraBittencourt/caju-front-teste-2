import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';
import routes from "~/router/routes";
import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import { useRegistrationMutate } from "~/hooks/useRegistrationMutate";
import { IFormRegistration } from "~/interfaces/IFormRegistration";
import { registrationValidations } from "~/utils";

const Form = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: registrationValidations
  });

  const [infoAlert, setInfoAlert] = useState({});
  const { mutate, isSuccess, isError } = useRegistrationMutate();
  const history = useHistory();

  const onSubmit = (values: IFormRegistration) => {
    const data = {
      ...values,
      status: "REVIEW"
    };
    mutate(data);
  };

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  useEffect(() => {
    if (isSuccess) {
      setInfoAlert({
        status: 'success',
        description: 'Alteração realizada com sucesso'
      });
      goToHome();
    } else if (isError) {
      setInfoAlert({
        status: 'error',
        description: 'Não foi possível realizar a alteração, tente novamente'
      });
    }

  }, [isSuccess, isError]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="employeeName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              placeholder="Nome"
              label="Nome"
              {...field}
              error={errors.employeeName}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              placeholder="Email"
              label="Email"
              type="email"
              {...field}
              error={errors.email}
            />
          )}
        />
        <Controller
          name="cpf"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputMask
              {...field}
              maskChar=""
              mask="999.999.999-99"
              onChange={(e) => field.onChange(e.target.value)}
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
        <Controller
          name="admissionDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Data de admissão"
              type="date"
              {...field}
            />
          )}
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      {(isError || isSuccess) && (
        <Alert
          severity={infoAlert.status}
          sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
        >
          <AlertTitle>{infoAlert.description}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default Form;
