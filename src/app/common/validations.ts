import { Validators } from '@angular/forms'
import * as moment from 'moment'

export const OptionalTextValidation = [Validators.minLength(2)]
export const RequiredTextValidation = OptionalTextValidation.concat([Validators.required])
export const EmailValidation = [Validators.required, Validators.email]
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50),
]
export const PushDateValidation = [
  Validators.required,
  Validators.min(moment().unix()),
  Validators.max(
    moment()
      .add(1, 'months')
      .unix()
  ),
]
export const NumericInputValidation = [Validators.pattern('^[0-9]*$')]
