import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositesComponent } from './deposites/deposites.component';
import {OrderListModule} from 'primeng/orderlist'; 
import {ButtonModule} from 'primeng/button';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import {CalendarModule} from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {AccordionModule} from 'primeng/accordion';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { CurrencyModule } from 'src/app/models-components/currency/currency.module';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { NewDepositeComponent } from './new-deposite/new-deposite.component';



@NgModule({
  declarations: [DepositesComponent, EditDetailsComponent, NewDepositeComponent],
  imports: [
    CommonModule,
    OrderListModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    CurrencyModule,
    RouterModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[
    EditDetailsComponent,DepositesComponent
  ]
})
export class DepositesModule { }
