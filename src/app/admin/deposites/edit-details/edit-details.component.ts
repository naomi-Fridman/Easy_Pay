import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Depositor } from 'src/app/models/Depositor';
import { Message } from 'primeng/api/message';
import { DepositesService } from '../../../services/deposites.service';
import { UsersService } from '../../../services/users.service';
import { Currency } from 'src/app/models/Currency';
import { CurrancyService } from 'src/app/services/currancy.service';
import { SelectItem } from 'primeng/api';
import { formatDate } from '@angular/common';


@Component({
  selector: 'edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  msgs: Message[] = [];
  _depositor: Depositor
  formSubmitAttempt: boolean = false;
  formErr: boolean = false;
  displayStyle: string = "none";
  err: boolean = false;

  constructor( private _acr: ActivatedRoute, private depositesService: DepositesService) {


  }
  
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
    if (this.DepositorDetailesDepositeForm.valid && !this.formErr) {
      this._depositor.deposite = this.DepositorDetailesDepositeForm.value;
      this.depositesService.updateDepositor(this._depositor.deposite).subscribe(e => {
          this.displayStyle = "block";
        
      }, (err => {
        this.err = true;
        this.displayStyle = "block";
      }));
    }
    else {
      this.formErr = true
    }

    // this.updatedDepositor.deposite = this.DepositorDetailesDepositeForm.value;
    // this.depositesService.updateDepositor(this.updatedDepositor.deposite).subscribe(data => {
    //   this.msgs.push({ severity: 'success', summary: 'עדכון הפקדה', detail: 'העדכון בוצע בהצלחה' });
    // })
  }
  get DepositorDepositeFormControl() { return this.DepositorDetailesDepositeForm.controls; }

  DepositorDetailesDepositeForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    sum: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    currencyId: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    returnDate: new FormControl(""),
    comments: new FormControl(""),
    status: new FormControl(true),
    hebrewDate: new FormControl(""),
    hebrewReturnDate: new FormControl(""),
    directDebitId: new FormControl(null),
    creditCardId: new FormControl(null),
    userId: new FormControl(null),
    date: new FormControl("", { validators: [Validators.required], updateOn: 'blur' })
  });



  ngOnInit() {
    this._depositor = JSON.parse(this._acr.snapshot.paramMap.get("depositor"));
    this.DepositorDetailesDepositeForm.controls["id"].setValue(this._depositor.deposite.id);
    this.DepositorDetailesDepositeForm.controls["sum"].setValue(this._depositor.deposite.sum);
    this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(this._depositor.deposite.currencyId);
    this.DepositorDetailesDepositeForm.controls["returnDate"].setValue(formatDate(this._depositor.deposite.returnDate, 'yyyy-MM-dd', 'en'));
    this.DepositorDetailesDepositeForm.controls["comments"].setValue(this._depositor.deposite.comment);
    this.DepositorDetailesDepositeForm.controls["status"].setValue(this._depositor.deposite.status);
    this.DepositorDetailesDepositeForm.controls["hebrewDate"].setValue(this._depositor.deposite.hebrewDate);
    this.DepositorDetailesDepositeForm.controls["hebrewReturnDate"].setValue(this._depositor.deposite.hebrewReturnDate);
    this.DepositorDetailesDepositeForm.controls["date"].setValue(formatDate(this._depositor.deposite.date, 'yyyy-MM-dd', 'en'));
    this.DepositorDetailesDepositeForm.controls["creditCardId"].setValue(this._depositor.deposite.creditCardId);
    this.DepositorDetailesDepositeForm.controls["userId"].setValue(this._depositor.deposite.userId);
    this.DepositorDetailesDepositeForm.controls["directDebitId"].setValue(this._depositor.deposite.directDebitId);

  }
}

