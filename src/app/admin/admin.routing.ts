import { Routes } from "@angular/router";
import { DepositesComponent } from './deposites/deposites/deposites.component';
import { LoansComponent } from './loans/loans/loans.component';
import { UsersComponent } from './users/users/users.component';
import { EditUserDetailsComponent } from './users/edit-user-details/edit-user-details.component';
import { LoanerDetailesComponent } from './loans/loaner-detailes/loaner-detailes.component';
import { EditDetailsComponent } from './deposites/edit-details/edit-details.component';
import { PaymentsComponent } from './payments/payments/payments.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { NewLoanComponent } from './loans/new-loan/new-loan.component';
import { NewDepositeComponent } from './deposites/new-deposite/new-deposite.component';
import { NewPaymentComponent } from './payments/new-payment/new-payment.component';

export const AdminRoutes: Routes = [
      // {path:'',component:DailyActivityComponent},
    //   {path: "adminl",component: AdminLayoutComponent},
      {path:"deposites",component:DepositesComponent},
      {path:"newLoan",component:NewLoanComponent},
      {path:"newDeposite" , component:NewDepositeComponent},
      {path:"newPayment",component:NewPaymentComponent},
      {path:"loans",component:LoansComponent},
      {path:"users",component:UsersComponent},
      {path:"editUserDetails/:userId",component:EditUserDetailsComponent},
      {path:"loanerDetails/:loaner",component:LoanerDetailesComponent}, 
      {path:"editDetails/:depositorId",component:EditDetailsComponent},
      {path:"payments", component:PaymentsComponent},
      {path: "**", component:PageNotFoundComponent}
  ];