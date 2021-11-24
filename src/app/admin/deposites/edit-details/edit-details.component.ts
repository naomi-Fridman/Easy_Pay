import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Depositor } from 'src/app/models/Depositor';
import { Message } from 'primeng/api/message';
import { DepositesService } from '../../../services/deposites.service';
import { UsersService } from '../../../services/users.service';
import { DetailsService } from 'src/app/details.service';
import { Currency } from 'src/app/models/Currency';
import { CurrancyService } from 'src/app/services/currancy.service';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  msgs: Message[] = [];
  currency: Currency;
  
  //private depositorr: Depositor;
   private _depositor: Depositor
  id: number;
  currancyId: number;
  updatedDepositor = new Depositor;
  currencyArr: SelectItem[];
  @Input()
  set depositorr(value : Depositor){
    
    this._depositor=value;
    this.depositorDetailesForm.controls["id"].setValue(this._depositor.deposite.id);
    this.depositorDetailesForm.controls["sum"].setValue(this._depositor.deposite.sum);
    this.depositorDetailesForm.controls["returnDate"].setValue(this._depositor.deposite.returnDate);
    this.depositorDetailesForm.controls["comment"].setValue(this._depositor.deposite.comment);
    this.depositorDetailesForm.controls["status"].setValue(this._depositor.deposite.status);
    this.depositorDetailesForm.controls["hebrewDepositeDate"].setValue(this._depositor.deposite.hebrewDepositeDate);
    this.depositorDetailesForm.controls["hebrewDepositeReturnDate"].setValue(this._depositor.deposite.hebrewDepositeReturnDate);
    this.depositorDetailesForm.controls["paymentsNumber"].setValue(this._depositor.deposite.paymentsNumber);
    this.depositorDetailesForm.controls["depositeDate"].setValue(this._depositor.deposite.depositeDate);
    this.depositorDetailesForm.controls["creditCardId"].setValue(this._depositor.deposite.creditCardId);
    this.depositorDetailesForm.controls["accountNumber"].setValue(0);
    this.depositorDetailesForm.controls["userId"].setValue(this._depositor.deposite.userId);
    this.depositorDetailesForm.controls["directDebitId"].setValue(this._depositor.deposite.directDebitId);
    this.depositorDetailesForm.controls["paymentsNumber"].setValue(this._depositor.deposite.paymentsNumber);
    this.depositorDetailesForm.controls["currencyId"].setValue(this._depositor.deposite.currencyId);

  }
  constructor(private currencyService: CurrancyService, private detailsS: DetailsService, private _acr: ActivatedRoute, private userService: UsersService, private depositesService: DepositesService) {
  // this.Depositor=new Depositor();

    
    // this._acr.paramMap.subscribe(params => {
    //   this.id = JSON.parse(params.get("depositorId"));
    //   this.depositesService.getDepositById(this.id).subscribe(data => {
    //     this.currancyId = data.currencyId;
    // this.detailsS.currrancyTypeId=this.currancyId;
    // this.Depositor.deposit = data;
    // this.userService.getUserById(this.Depositor.deposit.userId).subscribe(user => {
    //   this.depositesService.getcurrancyTypeByCurrancyId(this.currancyId).subscribe(data => {
    //     this.currency = data;
    // this.currencyDetailesForm.controls["type"].setValue(this.currency.type);
    // this.currencyDetailesForm.controls["valueInShkalim"].setValue(this.currency.valueInShkalim);
    // this.currencyDetailesForm.controls["updatedLast"].setValue(this.currency.updatedLast);
    // });
    // this.Depositor.user = user;
    // this.depositorDetailesForm.controls["depositId"].setValue(this.depositorr.deposit.id);
    // this.depositorDetailesForm.controls["sum"].setValue(this.depositorr.deposit.sum);
    // this.depositorDetailesForm.controls["returnDate"].setValue(this.depositorr.deposit.returnDate);
    // this.depositorDetailesForm.controls["comment"].setValue(this.depositorr.deposit.comment);
    // this.depositorDetailesForm.controls["status"].setValue(this.depositorr.deposit.status);
    // this.depositorDetailesForm.controls["hebrewDepositeDate"].setValue(this.depositorr.deposit.hebrewDepositeDate);
    // this.depositorDetailesForm.controls["hebrewDepositeReturnDate"].setValue(this.depositorr.deposit.hebrewDepositeReturnDate);
    // this.depositorDetailesForm.controls["paymentsNumber"].setValue(this.depositorr.deposit.paymentsNumber);
    // this.depositorDetailesForm.controls["depositeDate"].setValue(this.depositorr.deposit.depositeDate);
    // this.depositorDetailesForm.controls["accountNumber"].setValue(this.Depositor.deposit. );

    this.currencyArr = [
      { label: 'שקל', value: { id: 1, name: 'שקל' } },
      { label: 'דולר', value: { id: 2, name: 'דולר' } },
      { label: 'יורו', value: { id: 3, name: 'יורו' } }];


    {
    }
//     this.updatedDepositor = this.Depositor;
//   }, err => {
//   this.Depositor.deposit = null;
// });
//       }, err => {
//   this.Depositor.user = null;
// });
//     });
//   }
// currencyDetailesForm: FormGroup = new FormGroup({
//   type: new FormControl(""),
//   valueInShkalim: new FormControl(0),
//   updatedLast: new FormControl("")
// })
  }
save() {
  this.updatedDepositor.deposite = this.depositorDetailesForm.value;
  //this.updatedDepositor.deposit.currencyId=this.currencyDetailesForm.controls["type"].value;      
  //  this.updatedDepositor.user=this.userDetailesForm.value;
  this.depositesService.updateDepositor(this.updatedDepositor.deposite).subscribe(data => {
      this.msgs.push({ severity: 'success', summary: 'עדכון הפקדה', detail: 'העדכון בוצע בהצלחה' });
    })
}
depositorDetailesForm: FormGroup = new FormGroup({
  id: new FormControl(null),
  sum: new FormControl(null),
  currencyId: new FormControl(null),
  returnDate: new FormControl(""),
  comment: new FormControl(""),
  status: new FormControl(null),
  hebrewDepositeDate: new FormControl(""),
  hebrewDepositeReturnDate: new FormControl(""),
  directDebitId: new FormControl(null),
  paymentsNumber: new FormControl(null),
  creditCardId: new FormControl(null),
  accountNumber: new FormControl(null),
  depositeDate: new FormControl(""),
  userId: new FormControl(null)
});


ngOnInit() {
}
}

