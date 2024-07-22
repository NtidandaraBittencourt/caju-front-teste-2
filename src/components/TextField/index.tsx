import { forwardRef, InputHTMLAttributes, useId } from "react";
import * as S from "./styles";

type Props = {label?: string, error?: {message: string, type: string}} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(({error={},label="", ...props}, ref) => {

  const inputId = useId()

  return (
    <S.Container>
      <label htmlFor={inputId}>{label}</label>
      <S.Input ref={ref} {...props} id={inputId} style={{borderColor: error.message ? 'red' : 'green'}}/>
      {error && <span style={{fontSize: 12, color: 'red'}}>{error.message}</span>}
    </S.Container>
  );
});

export default TextField;
