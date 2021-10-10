import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { LoansService } from 'src/app/services/loans.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { UsersService } from 'src/app/services/users.service';
import {Message,MessageService} from 'primeng/api';
import { DialogService } from 'src/app/services/dialogService';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'],
  providers:[MessageService]
})
export class NewPaymentComponent implements OnInit {
  payment: Payment = new Payment();
  identity:boolean=false
  
  constructor(private userService: UsersService, private paymentService: PaymentsService, private loanService: LoansService, private route: Router,private messageService: MessageService, private dialogService: DialogService) { }


  save() {
    this.userService.getUserByIdentityNumber(this.PaymentDetailesUserForm.controls["identityNumber"].value).subscribe(user => {
      this.loanService.checkIfUserHasLoan(user.id).subscribe(loan => {
        debugger
        if (loan) {
          if (this.PaymentDetailesForm.controls["currencyId"].value == "3")
            this.PaymentDetailesForm.controls["currencyId"].setValue(JSON.parse(this.PaymentDetailesForm.controls["currencyId"].value))
          else if (this.PaymentDetailesForm.controls["currencyId"].value == "1")
            this.PaymentDetailesForm.controls["currencyId"].setValue(JSON.parse(this.PaymentDetailesForm.controls["currencyId"].value))
          this.payment.userId = user.id;
          this.payment.typeId = 1;
          this.payment.inputDate = this.PaymentDetailesForm.controls["inputDate"].value;
          this.payment.hebrewPaymentDate = this.PaymentDetailesForm.controls["hebrewPaymenteDate"].value;
          this.payment.currencyId = this.PaymentDetailesForm.controls["currencyId"].value;
          this.payment.collectionSum = this.PaymentDetailesForm.controls["collectionSum"].value;
          this.payment.comments = this.PaymentDetailesForm.controls["comments"].value;
          this.payment.paymentMethodId = 1//1 is cash but we have another option of 2 - chek - so we have to check it
            debugger
            if(loan.monthlyPaymentSum>this.payment.collectionSum){
              alert("שים לב: סכום התשלום החודשי הוא:"+ loan.monthlyPaymentSum +"האם אתה בטוח שאתה רוצה להכיס את הסכום המבוקש?")
              this.payment.comments+=" הוכנס תשלום נמוך מהתשלום החודשי"
            }
            else if(loan.monthlyPaymentSum<this.payment.collectionSum){
              alert("שים לב: סכום התשלום החודשי הוא:"+ loan.monthlyPaymentSum +"האם אתה בטוח שאתה רוצה להכיס את הסכום המבוקש?")
              this.payment.comments+=" הוכנס תשלום גבוה מהתשלום החודשי"
            }
            else{
              this.paymentService.postPayment(this.payment).subscribe(data => {
                alert("ההלוואה עודכנה סכום היתרה הוא" + data)
              })
            }
        }
        else {
          this.identity=true;
        }
      })
    })
    err => {
      alert("אופס , היתה תקלה וההלוואה לא עודכנה")
    }
  }
  ngOnInit() {
  }
  PaymentDetailesUserForm: FormGroup = new FormGroup({
    identityNumber: new FormControl(0)
  });
  PaymentDetailesForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    paymentDate: new FormControl(""),
    currencyId: new FormControl(0),
    collectionSum: new FormControl(0),
    comments: new FormControl(""),
    hebrewPaymenteDate: new FormControl(""),
    inputDate: new FormControl("")
  });
}
