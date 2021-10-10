import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import {AccordionModule} from 'primeng/accordion';
import { ButtonModule } from 'primeng//button';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormTryOutComponent } from './form-try-out/form-try-out.component';

@NgModule({
  declarations: [UsersComponent, EditUserDetailsComponent, FormTryOutComponent],
  imports: [
    CommonModule,AccordionModule,ButtonModule,BrowserModule,
    FormsModule,
    ReactiveFormsModule,InputTextModule,ToastModule,AutoCompleteModule
  ],
 providers: [MessageService],
 exports:[UsersComponent]
})
export class UsersModule { 
  
}
