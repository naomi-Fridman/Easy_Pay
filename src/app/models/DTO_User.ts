import { EmailValidator } from '@angular/forms'
import { Loan } from '../models/Loan';


export class DTO_User{
    userName :string
    id :number
    password :string
    firstName:string
    lastName :string
    email :string
    address:string
    city :string
    telephoneNumber1 :number
    telephoneNumber2 :number
    comments :string  
    identityNumber: number
    loan:Loan

}