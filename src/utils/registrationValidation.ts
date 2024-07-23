import * as Yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'

const registrationValidationsScrema = Yup.object({
    employeeName: Yup.string()
        .required("Preenche o seu nome completo")
        .matches(/^\D/, "O nome não pode começar com número")
        .matches(/\s+/, "Preencha nome e sobrenome")
            .test('two-words', 'O nome completo deve conter nome e sobrenome', value => {
            if (!value) return false;
            const words = value.trim().split(/\s+/);
            return words.length >= 2;
        }),
    email: Yup.string().required("Preencha o e-mail").matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,"Preenche um e-mail válido"),
    cpf: Yup.string().required("Prenche com um CPF válido").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
})

export const registrationValidations = yupResolver(registrationValidationsScrema)