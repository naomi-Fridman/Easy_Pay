import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositesComponent } from './admin/deposites/deposites/deposites.component';
import { LoansComponent } from './admin/loans/loans/loans.component';
import { UsersComponent } from './admin/users/users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { DailyActivityComponent } from './admin/daily-activity/daily-activity.component';
import { PaymentsComponent } from './admin/payments/payments/payments.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "deposites", component: DepositesComponent },
  { path: "loans", component: LoansComponent },
  { path: "users", component: UsersComponent },
  { path: "payments", component: PaymentsComponent },
  { path: "homePage", component: DailyActivityComponent },
  { path: "", component: AppComponent },
  // {path: "register",component: RegisterComponent},
  //{ path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
