import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { LoanerDetailesComponent } from './loaner-detailes/loaner-detailes.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LoansComponent } from './loans/loans.component';
import { RouterModule } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {ListboxModule} from 'primeng/listbox';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { GuarantyModule } from 'src/app/models-components/guaranty/guaranty.module';
import { NewLoanComponent } from './new-loan/new-loan.component';
import {FileUploadModule} from 'primeng/fileupload';
import { BrowserModule } from '@angular/platform-browser';
// import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [LoansComponent, LoanerDetailesComponent, NewLoanComponent,NewLoanComponent],
  imports: [
    BrowserModule,
    GuarantyModule,
    ReactiveFormsModule,
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
    CheckboxModule,
    FormsModule,
    ListboxModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    // VirtualScrollerModule,
    RouterModule.forChild([
      {path:"loanerDetails/:loaner",component:LoanerDetailesComponent}
    ])
  ],
  providers:[AdminService,ConfirmationService,ConfirmationService],

  exports:[LoansComponent, LoanerDetailesComponent,NewLoanComponent]
})
export class LoansModule { }
