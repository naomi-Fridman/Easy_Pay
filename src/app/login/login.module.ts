import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {PasswordModule} from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { DepositesComponent } from '../admin/deposites/deposites/deposites.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    FormsModule
,    CommonModule,PasswordModule,InputTextModule,RouterModule.forChild([
      {path:"register",component:RegisterComponent},
      {path:"deposit",component:DepositesComponent},
      // {path:"/",component:LoginComponent},
    ])
  ],
  exports:[LoginComponent,RegisterComponent]

})

export class LoginModule { }
