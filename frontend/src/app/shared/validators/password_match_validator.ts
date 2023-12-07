import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => {
        //prendo i controlli dal form
        const passwordControl = form.get(passwordControlName);
        const confirmPasswordControl = form.get(confirmPasswordControlName);
    
        if(!passwordControl || !confirmPasswordControl) return; //normalmente non succede, ma evita errori dal compilatore

        if(passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({notMatch: true}); //mostro l'errore solo nel campo di conferma password
        } else {
            const errors = confirmPasswordControl.errors; //prendo tutti gli errori
            if(!errors) return; // se non ci sono errori ritorna

            delete errors.notMatch; //altrimenti rimuovo l'errore dalla lista
            confirmPasswordControl.setErrors(errors); //aggiorno la lista
        }
    }

    return validator; //ritorna una funzione
}