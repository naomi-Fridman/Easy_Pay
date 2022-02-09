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
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {ListboxModule} from 'primeng/listbox';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { GuarantyModule } from 'src/app/models-components/guaranty/guaranty.module';
import { NewLoanComponent } from './new-loan/new-loan.component';
import {FileUploadModule} from 'primeng/fileupload';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from 'primeng/accordion';
import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';
import { EditLoanDetailsComponent } from './edit-loan-details/edit-loan-details.component';


// import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [LoansComponent, LoanerDetailesComponent, NewLoanComponent,NewLoanComponent, EditLoanDetailsComponent],
  imports: [
    // NgbModule,
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
    MatIconModule,
    // VirtualScrollerModule,
    RouterModule.forChild([
      {path:"loanerDetails/:loaner",component:LoanerDetailesComponent}
    ])
  ],
  providers:[AdminService,ConfirmationService,ConfirmationService],

  exports:[LoansComponent, LoanerDetailesComponent,NewLoanComponent]
})
export class LoansModule { }
