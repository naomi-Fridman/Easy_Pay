import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { Loaner } from 'src/app/models/Loaner';
@Component({
  selector: 'app-loaner-detailes',
  templateUrl: './loaner-detailes.component.html',
  styleUrls: ['./loaner-detailes.component.css']
})
export class LoanerDetailesComponent implements OnInit {
  constructor(private _acr: ActivatedRoute) {
  }
  private _loaner: Loaner

  @Input()
  set loaner(value: Loaner) {
    this._loaner = value;
    // this._loaner.loaner.paidUp
    this.loanerDetailesForm.controls["sum"].setValue(this._loaner.loaner.sum);
    this.loanerDetailesForm.controls["loanDate"].setValue(this._loaner.loaner.loanDate);
    this.loanerDetailesForm.controls["hebrewLoanDate"].setValue(this._loaner.loaner.hebrewLoanDate);
    this.loanerDetailesForm.controls["repaymentDate"].setValue(this._loaner.loaner.repaymentDate);
    this.loanerDetailesForm.controls["hebrewRepaymentDate"].setValue(this._loaner.loaner.hebrewRepaymentDate);
    this.loanerDetailesForm.controls["paymentsNumber"].setValue(this._loaner.loaner.paymentsNumber);
    this.loanerDetailesForm.controls["paidUp"].setValue(this._loaner.loaner.paidUp);
  }
  editDetails() {

  }
  loanerDetailesForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    cellphoneNumber: new FormControl(),
    telephoneNumber: new FormControl(),
    email: new FormControl(""),
    // address:new FormControl(),
    // city :new FormControl(),
    // comments:new FormControl(),
    // identityNumber:new FormControl(),
    currency: new FormControl(),
    sum: new FormControl(),
    loanDate: new FormControl(),
    hebrewLoanDate: new FormControl(),
    repaymentDate: new FormControl(""),
    hebrewRepaymentDate: new FormControl(""),
    repaymentManner: new FormControl(),
    // firstPaymentDate:new FormControl(),
    paymentsNumber: new FormControl(),
    // accountNumber:new FormControl(),
    // dayInMonth:new FormControl(),
    paidUp: new FormControl(),
  });
  // PaymentDetailesForm:FormGroup=new FormGroup({
  //   paymentDate :new FormControl(),
  //     PaymentSum:new FormControl(),
  //     Cash:new FormControl(),
  //   });

  // loaner:Loaner=new Loaner();

  ngOnInit() {
    // this._acr.paramMap.subscribe(params => {
    //   this.loaner=JSON.parse(params.get("loaner")) ;
    // this.loanerDetailesForm.controls["firstName"].setValue(this.loaner.user.firstName);
    // this.loanerDetailesForm.controls["lastName"].setValue(this.loaner.user.lastName);
    // this.loanerDetailesForm.controls["cellphone"].setValue(this.loaner.user.t);
    // this.loanerDetailesForm.controls["email"].setValue(this.loaner.user.email);
    // this.loanerDetailesForm.controls["address"].setValue(this.loaner.user.address);
    // this.loanerDetailesForm.controls["appartmentNumber"].setValue(this.loaner.user.apartmentNumber);



    // console.log(this.loaner)
    //  },err=>{
    //    this.loaner=null
    //  }
    //    );      
  }

}
