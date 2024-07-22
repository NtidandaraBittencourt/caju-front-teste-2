import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import routes from "~/router/routes";

import Button from "~/components/Buttons";
import TextField from "~/components/TextField";

import { useRegistrationMutate } from "~/hooks/useRegistrationMutate";
import { IFormRegistration } from "~/interfaces/IFormRegistration";
import { registrationValidations } from "~/utils";
// import Pattern from "../TextField/Pattern";
// import { PatternFormat } from 'react-number-format';

// import InputMask from 'react-input-mask'
  
const Form = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: registrationValidations
  });

  const [infoAlert, setInfoAlert] = useState({})
  const { mutate, isSuccess, isError } = useRegistrationMutate()
  const history = useHistory();

  const onSubmit = (values: IFormRegistration) => {
    const data = {
      ...values,
      status: "REVIEW"
    } 
    mutate(data)
  }

  const goToHome = () => {
    history.push(routes.dashboard);
  }

  useEffect(() =>{
    if(isSuccess) {
      setInfoAlert({
        status: 'success',
        description: 'Alteração realizada com sucesso'
      })
      goToHome()
    }
  },[isSuccess])

  useEffect(() => {
        setInfoAlert({
      status: 'error',
      description: 'Não foi possivel realizar alteração, tente novamente'
    })
  },[isError])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField placeholder="Nome" label="Nome" id="employeeName" {...register('employeeName')} error={errors.employeeName} />
        <TextField placeholder="Email" label="Email" type="email" id="email" {...register('email')} error={errors.email}/>
        {/* <PatternFormat
          getInputRef={() => register('cpf').ref}
          format="###.###.###-##"
          mask="_"
          allowEmptyFormatting
          type="text"
          displayType="input"
          customInput={TextField}
          placeholder={"CPF"}
          label={"CPF"}
          error={errors.cpf ? errors.cpf.message : undefined}
        /> */}
        <TextField placeholder="cpf" label="cpf" id="cpf" {...register('cpf')} error={errors.cpf}/>

        <TextField label="Data de admissão" type="date" id="admissionDate" {...register('admissionDate')}/>
        <Button type="submit">Cadastrar</Button>
      </form>

      {isError ||isSuccess ? (
        <Alert severity={infoAlert.status} sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
          <AlertTitle> {infoAlert.description} </AlertTitle>
        </Alert>
      ): null}
    </div>
  );
};
  
  export default Form