import { User } from './User';
import { Loan } from './Loan';
import { Payment } from './Payment';
import { Currency } from './Currency';
import { GuarantyUser } from './GuarantyUser';
import { DirectDebit } from './directDebit';
import { ArrayType } from '@angular/compiler';

export class Loaner{
  user:User;
  loaner:Loan;
  payments:Payment[];
  currency:Currency;
  guaranty:GuarantyUser[];
  directDebit:DirectDebit;
  }