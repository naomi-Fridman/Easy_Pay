import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { LoansService } from 'src/app/services/loans.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { UsersService } from 'src/app/services/users.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'src/app/services/dialogService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/models-components/dialog/dialog.component';
import bootstrap from 'bootstrap'

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'],
  providers: [MessageService]
})
export class NewPaymentComponent implements OnInit {
  payment: Payment = new Payment();
  identity: boolean = false;
  formSubmitAttempt: boolean = false;
  todaysDate = new Date();
  closeResult: string;
  modalMessage="";
  displayStyle="none"

  constructor(private userService: UsersService, private paymentService: PaymentsService, private loanService: LoansService, private route: Router, private messageService: MessageService) { }
 

  err: boolean = false;
  save() {
    this.formSubmitAttempt = true;
    if (this.PaymentDetailesForm.valid && this.PaymentDetailesUserForm.valid) {
      this.userService.getUserByIdentityNumber(this.PaymentDetailesUserForm.controls["identityNumber"].value).subscribe(user => {
        this.loanService.checkIfUserHasLoan(user.id).subscribe(loan => {
          if (loan) {
            if (loan.monthlyPaymentSum != this.payment.sum) {
              this.openPopup("the sum is not exact")
            }
            else {
              this.payment = this.PaymentDetailesForm.value;
              this.payment.userId = user.id;
              this.payment.loanId = loan.id;
              this.payment.numOfPayments = loan.paymentsIndex + 1;
              this.paymentService.postPayment(this.payment).subscribe(data => {
              })
            }
          }
          else {
            this.openPopup("the user doesnt have a loan")
          }
        })
      })
      err => {
        this.openPopup("the user does not exesit")
      }
    }
    else{
      this.openPopup("יש שגיאה בהזנת הנתונים")
    }

  }
  openPopup(msg) {
    this.modalMessage=msg;
    this.displayStyle = "block";
    
  }
  closePopup() {
    this.displayStyle = "none";
  }

  ngOnInit() {

  }
  get PaymentDetailesUserFormControl() { return this.PaymentDetailesUserForm.controls; }
  get PaymentDetailesFormControl() { return this.PaymentDetailesForm.controls; }

  PaymentDetailesUserForm: FormGroup = new FormGroup({
    identityNumber: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    firstName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    lastName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' })
  });
  PaymentDetailesForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    userId: new FormControl(),
    date: new FormControl(""),
    currencyId: new FormControl(3, { validators: [Validators.required], updateOn: 'blur' }),
    sum: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    comments: new FormControl(""),
    hebrewPaymenteDate: new FormControl(""),
    inputDate: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    exchangeRate: new FormControl(0),
    methodId: new FormControl(1),
    directDebitId: new FormControl(0),
    creditCardId: new FormControl(0),
    loanId: new FormControl(),
    numOfPayments: new FormControl(),
  });













}
