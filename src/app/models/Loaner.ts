import { User } from './User';
import { Loan } from './Loan';
import { Payment } from './Payment';
import { Currency } from './Currency';
import { GuarantyUser } from './GuarantyUser';
import { DirectDebit } from './directDebit';
import { LoanPaymantsStatus } from './loanPaymantsStatus';

export class Loaner{
  user:User;
  loaner:Loan;
  payments:Payment[];
  currency:Currency;
  guaranty:GuarantyUser[];
  directDebit:DirectDebit;
  loanPaymantsStatus:LoanPaymantsStatus;
  }