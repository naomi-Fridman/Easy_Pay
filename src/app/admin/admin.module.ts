import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UsersModule } from './users/users.module';
import { LoansModule } from './loans/loans.module';
import { DepositesModule } from './deposites/deposites.module';
import { LoansComponent } from './loans/loans/loans.component';
import { UsersComponent } from './users/users/users.component';
import { RouterModule } from '@angular/router';
import { DepositesComponent } from './deposites/deposites/deposites.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoanerDetailesComponent } from './loans/loaner-detailes/loaner-detailes.component';
import { EditDetailsComponent } from './deposites/edit-details/edit-details.component';
import { EditUserDetailsComponent } from './users/edit-user-details/edit-user-details.component';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {TabMenuModule} from 'primeng/tabmenu';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsComponent } from './payments/payments/payments.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminRoutes } from './admin.routing';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { PaymentComponent } from '../models-components/payment/payment/payment.component';



@NgModule({
  declarations: [AdminComponent,AdminLayoutComponent, DailyActivityComponent],
  imports: [
    CommonModule,UsersModule,LoansModule,DepositesModule,HttpClientModule,OrderListModule,PaymentsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    TabMenuModule,
    OrderListModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    RouterModule.forChild(AdminRoutes)
  ],
   exports:[AdminLayoutComponent,AdminComponent]
})
export class AdminModule { }
