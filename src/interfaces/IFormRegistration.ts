export interface IFormRegistration{
    id: String,
    admissionDate: String,
    email: String,
    employeeName: String,
    status: String,
    cpf: String
}

export interface IRegistrations {
    data: IFormRegistration
}