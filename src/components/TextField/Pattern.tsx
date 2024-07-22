import React from 'react';
import { PatternFormat } from 'react-number-format';
import TextField from '.';


type Props = {
  id: string;
  register: { ref: string}; // Tipo correto para register do React Hook Form
  error?: {
    message: string;
    type: string;
  };
  label?: string;
};

const Pattern = ({ id, register, error, label }: Props) => {
  return (
    <PatternFormat
      getInputRef={() => register('cpf').ref}
      format="###.###.###-##"
      mask="_"
      allowEmptyFormatting
      type="text"
      displayType="input"
      customInput={TextField}
      placeholder={label}
      label={label}
      id={id}
      error={error?.message || ''}
    />
  );
};

export default Pattern;
