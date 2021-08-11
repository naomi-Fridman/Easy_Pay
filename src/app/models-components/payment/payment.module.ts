import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsTypeComponent } from './payments-type/payments-type.component';



@NgModule({
  declarations: [PaymentMethodComponent, PaymentComponent, PaymentsTypeComponent],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
