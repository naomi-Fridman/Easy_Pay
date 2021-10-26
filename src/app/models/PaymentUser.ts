import { User } from './User';
import { Payment } from './Payment';
import { Loan } from './Loan';

export class PaymentUser{
  user:User;
  payment:Payment;
  loan:Loan;
  paymentsNumberFromTheLoan:Number;
  paymentsSum:Number;

}