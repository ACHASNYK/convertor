import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function Validaterate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors| null => {
      const value = this.
      if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { invalidUrl: true };
  }
  return null;
}