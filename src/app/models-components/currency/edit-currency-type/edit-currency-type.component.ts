import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurrancyService } from '../../../services/currancy.service';
import { Currency } from 'src/app/models/Currency';
import { DetailsService } from 'src/app/details.service';

@Component({
  selector: 'edit-currency-type',
  templateUrl: './edit-currency-type.component.html',
  styleUrls: ['./edit-currency-type.component.css']
})
export class EditCurrencyTypeComponent implements OnInit {

  currency:Currency;

  @Input()
  Id:number;


  constructor(private _acr: ActivatedRoute,private currencyService:CurrancyService,private details:DetailsService) {
           this.Id=this.details.currrancyTypeId;
    this.currencyService.getcurrancyTypeByCurrancyId(this.Id).subscribe(data=>{
      this.currency=data;
       
    this.currencyDetailesForm.controls["type"].setValue(this.currency.type);
    this.currencyDetailesForm.controls["valueInShkalim"].setValue(this.currency.valueInShkalim);
    this.currencyDetailesForm.controls["updatedLast"].setValue(this.currency.updatedLast);
    });
  }
  currencyDetailesForm :FormGroup =new FormGroup({
    type:new FormControl(""),
    valueInShkalim:new FormControl(""),
    updatedLast:new FormControl("")
  })
  ngOnInit() {
  }

}
