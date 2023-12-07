//definisco solo i campi inviati al server durante la registrazione di un nuovo utente
export interface IUserRegister {
    name: string,
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
}