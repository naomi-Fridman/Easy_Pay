import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {PasswordModule} from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { DepositesComponent } from '../admin/deposites/deposites/deposites.component';




@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,PasswordModule,InputTextModule,RouterModule.forChild([
      {path:"register",component:RegisterComponent},
      {path:"deposit",component:DepositesComponent},
    ])
  ],
  exports:[LoginComponent]

})

export class LoginModule { }
