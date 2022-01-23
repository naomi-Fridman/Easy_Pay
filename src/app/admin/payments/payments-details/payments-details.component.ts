import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { PaymentsService } from '../../../services/payments.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-payments-details',
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.css']
})
export class PaymentsDetailsComponent implements OnInit {

  constructor(private _acr: ActivatedRoute,private paymentService:PaymentsService) {
  }
  private _paymentUser: PaymentUser
  updatePayment:Payment
  value:boolean;
  @Input()
  set payment(value: PaymentUser) {
    this._paymentUser = value;
    // if(this._paymentUser.payment.deleted)
    //   this.value=true;
    // else this.value=false;
    
    this.paymentDetailesForm.controls["sum"].setValue(this._paymentUser.payment.sum);
    this.paymentDetailesForm.controls["comments"].setValue(this._paymentUser.payment.comments);
    this.paymentDetailesForm.controls["hebrewPaymentDate"].setValue(this._paymentUser.payment.hebrewPaymentDate);
    this.paymentDetailesForm.controls["inputDate"].setValue(formatDate(this._paymentUser.payment.inputDate, 'yyyy-MM-dd', 'en'));
    this.paymentDetailesForm.controls["date"].setValue(formatDate(this._paymentUser.payment.date, 'yyyy-MM-dd', 'en'));
    this.paymentDetailesForm.controls["id"].setValue(this._paymentUser.payment.id);
    this.paymentDetailesForm.controls["methodId"].setValue(this._paymentUser.payment.methodId);
    this.paymentDetailesForm.controls["userId"].setValue(this._paymentUser.payment.userId);
    this.paymentDetailesForm.controls["currencyId"].setValue(this._paymentUser.payment.currencyId);
    this.paymentDetailesForm.controls["exchangeRate"].setValue(this._paymentUser.payment.exchangeRate);
    this.paymentDetailesForm.controls["directDebitId"].setValue(this._paymentUser.payment.directDebitId);
    this.paymentDetailesForm.controls["creditCardId"].setValue(this._paymentUser.payment.creditCardId);
    this.paymentDetailesForm.controls["methodId"].setValue(this._paymentUser.payment.methodId);
    this.paymentDetailesForm.controls["loanSum"].setValue(this._paymentUser.loan.sum);
   
//להוסיף נתונים של דיירקט דבט במידה והוא בחר תאפשרות- מחקי את זה בטעות מהפורם
  }
  editDetails() {
    this.updatePayment = this.paymentDetailesForm.value;
    this.paymentService.updatePayment(this.updatePayment).subscribe(data => {
    })
  }
  paymentDetailesForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(),
    deleted: new FormControl(),
    collectionSum: new FormControl(),
    comments: new FormControl(),
    hebrewPaymentDate: new FormControl(),
    inputDate: new FormControl(),
    paymentDate: new FormControl(),
    currencyId:new FormControl(null),
    id:new FormControl(null),
    typeId:new FormControl(null),
    userId:new FormControl(null),
    exchangeRate:new FormControl(null),
    fee:new FormControl(null),
    feeDescriptionId:new FormControl(null),
    paymentMethodId:new FormControl(null),
    bankId:new FormControl(null),
    branchNumberId:new FormControl(null),
    directDebitId:new FormControl(null),
    reference:new FormControl(null),
    creditCardId:new FormControl(null),
    loanSum:new FormControl(null),
  });
  ngOnInit() {
  }

}
