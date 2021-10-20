import { User } from './User';
import { Payment } from './Payment';

export class PaymentUser{
  user:User;
  payment:Payment;
  paymentsNumberFromTheLoan:Number;
  paymentsSum:Number;
}