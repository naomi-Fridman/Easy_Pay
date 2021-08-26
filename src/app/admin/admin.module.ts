import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UsersModule } from './users/users.module';
import { LoansModule } from './loans/loans.module';
import { DepositesModule } from './deposites/deposites.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminRoutes } from './admin.routing';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';


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
    MessagesModule,
    MessageModule,
    RouterModule.forChild(AdminRoutes)
  ],
   exports:[AdminLayoutComponent,AdminComponent]
})
export class AdminModule { }
