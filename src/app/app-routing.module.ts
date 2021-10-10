import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component'
import { DepositesComponent } from './admin/deposites/deposites/deposites.component';
import { LoansComponent } from './admin/loans/loans/loans.component';
import { UsersComponent } from './admin/users/users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DailyActivityComponent } from './admin/daily-activity/daily-activity.component';
import { PaymentsComponent } from './admin/payments/payments/payments.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "deposites", component: DepositesComponent },
  { path: "loans", component: LoansComponent },
  { path: "users", component: UsersComponent },
  { path: "payments", component: PaymentsComponent },
  { path: "homePage", component: DailyActivityComponent },
  { path: "admin", redirectTo: 'adminl', pathMatch: 'full' },
  // { path: "", component: AppComponent },
  // {path: "AdminComponent",loadChildren: "./admin/admin.module#AdminModule"},
  // {path: "register",component: RegisterComponent},
  // {path:"admin" , redirectTo:'adminl' ,pathMatch:'full'},
  // {path:"" , component:AdminLayoutComponent},
  //  {path: '',component: AdminLayoutComponent,children: [{ path: 'info',loadChildren: './admin-layout/admin'}] }
  //{ path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
