import { User } from './User';
import { Loan } from './Loan';
import { DirectDebit } from './directDebit';
import { ArrayType } from '@angular/compiler';
import { Guaranty } from './Guaranty';


export class LoanDetailes{
  user:User;
  loaner:Loan;
  guaranty:Array<Guaranty>=new Array<Guaranty>();
  directDebit:DirectDebit;
  }