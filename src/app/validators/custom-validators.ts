import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmMatchPassword: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const pwd = control.get('pwdControl');
    const pwdConfirm = control.get('pwdConfirmControl');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value
        ? {passwordMatches: true}
        : null;
}

// validator to ensure user meets the parameters for secure password
export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;