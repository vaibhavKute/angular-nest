import { FormGroup } from '@angular/forms';

export const hasErrors = (form: FormGroup, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
};