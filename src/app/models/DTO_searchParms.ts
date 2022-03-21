import { EmailValidator } from '@angular/forms'
import { Loan } from './Loan';

export class DTO_searchParms {
    firstName?: string
    lastName?: string
    identityNumber?: string
    cellephoneNumber?: string
    tellephoneNumber?: string
    address?: string
    email?: EmailValidator
    sum?:number
    date?:string
}
