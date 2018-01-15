import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function getTouchedControlsValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach(key => {
    const control = controls[ key ];
    if (control instanceof FormGroup) {
      errors = errors.concat(getTouchedControlsValidationErrors(control.controls));
    }
    const controlErrors: ValidationErrors = controls[ key ].errors;
    if (controlErrors !== null && control.touched) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({
          control_name: key,
          error_name: keyError,
          error_value: controlErrors[ keyError ]
        });
      });
    }
  });
  return errors;
}
