import { formatDate } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { get } from 'http';
import { Loaner } from 'src/app/models/Loaner';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-edit-loan-details',
  templateUrl: './edit-loan-details.component.html',
  styleUrls: ['./edit-loan-details.component.css']
})
export class EditLoanDetailsComponent implements OnInit {

  selectedFile: File;
  formSubmitAttempt: boolean = false;
  fileName: string = "";
  l: Loaner = new Loaner();

  constructor(private _acr: ActivatedRoute, private loansService: LoansService) { }

  get loanerDetailesLoanFormControl() { return this.loanerDetailesLoanForm.controls; }


  ngOnInit() {
    this.l = JSON.parse(this._acr.snapshot.paramMap.get("loaner"));
    this.loanerDetailesLoanForm.controls["id"].setValue(this.l.loaner.id);
    this.loanerDetailesLoanForm.controls["userId"].setValue(this.l.loaner.userId);
    this.loanerDetailesLoanForm.controls["currencyId"].setValue(this.l.loaner.currencyId);
    this.loanerDetailesLoanForm.controls["sum"].setValue(this.l.loaner.sum);
    this.loanerDetailesLoanForm.controls["date"].setValue(formatDate(this.l.loaner.date, 'yyyy-MM-dd', 'en'));
    this.loanerDetailesLoanForm.controls["hebrewDate"].setValue(this.l.loaner.hebrewDate);
    this.loanerDetailesLoanForm.controls["repaymentDate"].setValue(formatDate(this.l.loaner.repaymentDate, 'yyyy-MM-dd', 'en'));
    this.loanerDetailesLoanForm.controls["repaymentManner"].setValue(this.l.loaner.repaymentManner);
    this.loanerDetailesLoanForm.controls["hebrewRepaymentDate"].setValue(this.l.loaner.hebrewRepaymentDate);
    this.loanerDetailesLoanForm.controls["directDebitId"].setValue(this.l.loaner.directDebitId);
    this.loanerDetailesLoanForm.controls["paymentsNumber"].setValue(this.l.loaner.paymentsNumber);
    this.loanerDetailesLoanForm.controls["paidUp"].setValue(this.l.loaner.paidUp);
    this.loanerDetailesLoanForm.controls["guarantyId1"].setValue(this.l.loaner.guarantyId1);
    this.loanerDetailesLoanForm.controls["guarantyId2"].setValue(this.l.loaner.guarantyId2);
    this.loanerDetailesLoanForm.controls["guarantyId3"].setValue(this.l.loaner.guarantyId3);
    this.loanerDetailesLoanForm.controls["guarantyId4"].setValue(this.l.loaner.guarantyId4);
    this.loanerDetailesLoanForm.controls["guarantyId5"].setValue(this.l.loaner.guarantyId5);
    this.loanerDetailesLoanForm.controls["creditCardId"].setValue(this.l.loaner.creditCardId);
    this.loanerDetailesLoanForm.controls["monthlyPaymentSum"].setValue(this.l.loaner.monthlyPaymentSum);
    this.loanerDetailesLoanForm.controls["monthlyPaymentDay"].setValue(this.l.loaner.monthlyPaymentDay);
    // this.loanerDetailesLoanForm.controls["shtar"].setValue(this.l.loaner.shtar);
    this.loanerDetailesLoanForm.controls["paymentsIndex"].setValue(this.l.loaner.paymentsIndex);
    this.fileName = this.l.loaner.shtar;
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }
  err: boolean = false;
  formErr: boolean = false;
  displayStyle: string = 'none';


  openPopup() {
    this.displayStyle = "block";

  }
  closePopup() {
    this.displayStyle = "none";
    this.err = false;
    this.formErr = false;
  }


  save() {
    this.formSubmitAttempt = true;
    if (this.loanerDetailesLoanForm.valid && !this.formErr) {
      this.l.loaner = this.loanerDetailesLoanForm.value;
      this.l.loaner.shtar = this.fileName;
      this.loansService.updateLoan(this.l.loaner).subscribe(e => {
        if (e != null) {
          this.displayStyle = "block";
        }
        else{
          this.displayStyle = "block";
          this.err = true
        }

      }, (err => this.err = true));
    }
    else {
      this.formErr = true

    }

  }





  loanerDetailesLoanForm: FormGroup = new FormGroup({

    id: new FormControl(0),
    userId: new FormControl(),
    sum: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    currencyId: new FormControl(3, { validators: [Validators.required], updateOn: 'blur' }),
    date: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    hebrewDate: new FormControl(""),
    repaymentDate: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    repaymentManner: new FormControl(0),
    hebrewRepaymentDate: new FormControl(""),
    directDebitId: new FormControl(null),
    paymentsNumber: new FormControl(1),
    paidUp: new FormControl(false),
    guarantyId1: new FormControl(0),
    guarantyId2: new FormControl(0),
    guarantyId3: new FormControl(0),
    guarantyId4: new FormControl(0),
    guarantyId5: new FormControl(0),
    creditCardId: new FormControl(null),
    monthlyPaymentSum: new FormControl(0),
    monthlyPaymentDay: new FormControl(1),
    shtar: new FormControl(" ",),
    paymentsIndex: new FormControl(0),

  });
}

