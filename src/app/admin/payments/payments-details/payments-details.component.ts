import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { PaymentsService } from '../../../services/payments.service';

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
    if(this._paymentUser.payment.deleted)
      this.value=true;
    else this.value=false;
    this.paymentDetailesForm.controls["accountNumber"].setValue(this._paymentUser.payment.accountNumber);
    this.paymentDetailesForm.controls["deleted"].setValue(this._paymentUser.payment.deleted);
    this.paymentDetailesForm.controls["collectionSum"].setValue(this._paymentUser.payment.collectionSum);
    this.paymentDetailesForm.controls["comments"].setValue(this._paymentUser.payment.comments);
    this.paymentDetailesForm.controls["hebrewPaymentDate"].setValue(this._paymentUser.payment.hebrewPaymentDate);
    this.paymentDetailesForm.controls["inputDate"].setValue(this._paymentUser.payment.inputDate);
    this.paymentDetailesForm.controls["paymentDate"].setValue(this._paymentUser.payment.paymentDate);
    this.paymentDetailesForm.controls["id"].setValue(this._paymentUser.payment.id);
    this.paymentDetailesForm.controls["typeId"].setValue(this._paymentUser.payment.typeId);
    this.paymentDetailesForm.controls["userId"].setValue(this._paymentUser.payment.userId);
    this.paymentDetailesForm.controls["currencyId"].setValue(this._paymentUser.payment.currencyId);
    this.paymentDetailesForm.controls["exchangeRate"].setValue(this._paymentUser.payment.exchangeRate);
    this.paymentDetailesForm.controls["fee"].setValue(this._paymentUser.payment.fee);
    this.paymentDetailesForm.controls["feeDescriptionId"].setValue(this._paymentUser.payment.feeDescriptionId);
    this.paymentDetailesForm.controls["bankId"].setValue(this._paymentUser.payment.bankId);
    this.paymentDetailesForm.controls["branchNumberId"].setValue(this._paymentUser.payment.branchNumberId);
    this.paymentDetailesForm.controls["directDebitId"].setValue(this._paymentUser.payment.directDebitId);
    this.paymentDetailesForm.controls["reference"].setValue(this._paymentUser.payment.reference);
    this.paymentDetailesForm.controls["creditCardId"].setValue(this._paymentUser.payment.creditCardId);
    this.paymentDetailesForm.controls["paymentMethodId"].setValue(this._paymentUser.payment.paymentMethodId);

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
  });
  ngOnInit() {
  }

}
