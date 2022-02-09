import { EmailValidator } from '@angular/forms'
import { Loan } from '../models/Loan';


export class DTO_User{
    id :number
    firstName:string
    lastName :string
    email :string
    address:string
    cellphoneNumber :string
    telephoneNumber :string
    comments :string  
    identityNumber: string
    loan:Loan
}