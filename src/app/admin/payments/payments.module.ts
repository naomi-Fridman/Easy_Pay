import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments.component';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
// import {DropdownModule} from 'primeng/dropdown';
import { PaymentsDetailsComponent } from './payments-details/payments-details.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { NewPaymentComponent } from './new-payment/new-payment.component';


@NgModule({
  declarations: [PaymentsComponent, PaymentsDetailsComponent, NewPaymentComponent],
  imports: [
    CommonModule,
    // DropdownModule,
    ReactiveFormsModule,
    OrderListModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    AccordionModule,
    FormsModule,
    RouterModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
  ],
  exports:[PaymentsComponent]
})
export class PaymentsModule { }

