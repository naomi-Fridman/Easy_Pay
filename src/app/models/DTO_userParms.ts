import { EmailValidator } from '@angular/forms'
import { Loan } from './Loan';

export class DTO_userParms {
    firstName?: string
    lastName?: string
    identityNumber?: number
    tellephoneNumber1?: number
    tellephoneNumber2?: number
    address?: string
    city?: string
    email?: EmailValidator
}
